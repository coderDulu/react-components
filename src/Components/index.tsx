/**
 * 视频播放控制组件(用于替换原生的播放器控制组件)
 */
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import './font_fio1nvrgo2/iconfont';
import SvgItem from './svgItem';
import flvjs from 'flv.js';

interface PropTypes {
  className?: string;
  style?: any;
}



export default function index({
  className,
  style,
  type,
  url,
  ...args
}: PropTypes & flvjs.MediaDataSource) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlRef = useRef<HTMLDivElement>(null); // 控制元素
  const [progress, setProgress] = useState(0);    // 播放进度条

  // 状态
  const [isPlay, setIsPlay] = useState(false);  // 是否播放
  const [isMute, setIsMute] = useState(false);  // 是否静音
  const [isFs, setIsFs] = useState(false);      // 是否最大化
  const [volumeNum, setVolumeNum] = useState(0);  // 音量
  const [showRange, setShowRange] = useState(false) // 是否显示音量控制条


  useEffect(() => {

    const video = videoRef.current;
    let flvPlayer: flvjs.Player;
    if (video) {
      if (flvjs.isSupported()) {
        flvPlayer = flvjs.createPlayer({
          type,
          url,
          ...args
        });
        flvPlayer.attachMediaElement(video);
        // 加载
        flvPlayer.load();

        flvPlayer.on('error', err => {
          console.log(err)
          flvPlayer.unload()
        })

        flvPlayer.on(flvjs.Events.ERROR, (err, errdet) => {
          // 参数 err 是一级异常，errdet 是二级异常
          if (err == flvjs.ErrorTypes.MEDIA_ERROR) {
            console.log('媒体错误')
            if (errdet == flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
              console.log('媒体格式不支持')
            }
          }
          if (err == flvjs.ErrorTypes.NETWORK_ERROR) {
            console.log('网络错误')
            if (errdet == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
              console.log('http状态码异常')
            }
          }
          if (err == flvjs.ErrorTypes.OTHER_ERROR) {
            console.log('其他异常：', errdet)
          }
        });
      }

      setVolumeNum(video.volume * 100);
      video.addEventListener('timeupdate', () => {
        const newProgress = video.duration ? Math.floor(video.currentTime / (video.duration || 0) * 100) : 0;
        setProgress(_ => newProgress);
      })

      video.addEventListener('ended', () => { // 播放结束后,显示control
        setIsPlay(false);
        controlRef.current!.style.visibility = 'visible';
      })

    }

    return () => {
      flvPlayer.destroy();
    }

    // 监听错误事件

  }, [])

  // 播放视频
  function handlePlayPause() {
    try {
      if (videoRef.current?.ended || videoRef.current?.paused) {
        videoRef.current.play();

        setIsPlay(true);
      } else {
        videoRef.current?.pause();
        setIsPlay(false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 停止播放
  function handleStop() {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlay(false);
      setProgress(0);
    }
  }

  // 设置音量
  function setVolume(e: any) {
    const target = e.target
    // console.log();
    videoRef.current!.volume = target.value / 100;  // 设置音量

    if (target.value === '0') {   // 静音
      setIsMute(true);
    } else {
      setIsMute(false);
    }

    // console.log('volume', target.value)
    setVolumeNum(target.value)
  }

  // 静音
  function handleMute() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMute(videoRef.current.muted);
    }
  }

  // 音量处理
  function alterVolume(dir: '+' | '-') {
    const video = videoRef.current;
    if (video) {
      const currentVolume = Math.floor(video.volume * 10) / 10;
      // console.log(currentVolume)
      if (dir === '+' && currentVolume < 1) {
        video.volume += 0.01;
      } else if (dir === '-' && currentVolume > 0) {
        video.volume -= 0.01;
      }
    }
  }

  // 跳动
  function handleSkip(e: any) {
    if (!videoRef.current) return
    const target: HTMLProgressElement = e.target;

    const rect = target.getBoundingClientRect();
    const pos = (e.pageX - rect.left) / target.offsetWidth;

    videoRef.current.currentTime = pos * videoRef.current.duration;
  }

  // 显示控制
  function showControls() {
    if (controlRef.current) {
      controlRef.current.style.visibility = 'visible';
    }
  }

  // 隐藏控制
  function hiddenControls() {
    if (controlRef.current) {
      // console.log(controlRef.current.style.display);
      controlRef.current.style.visibility = 'hidden';
    }
  }

  // 全屏播放
  function handleFS() {
    if (containerRef.current) {
      if (document.fullscreenElement !== null) {
        document.exitFullscreen();
        setIsFs(false);
      } else {
        containerRef.current.requestFullscreen();
        setIsFs(true);
      }
      // containerRef.current.controls = false;
    }
  }



  return (
    <>
      <div style={style} className={`video-container ${className ?? null}`} ref={containerRef} onMouseEnter={showControls} onMouseLeave={hiddenControls}>
        <video preload='metadata' id='video-context' ref={videoRef} >
          {/* <source src={url} type="video/mp4" />
          Download the
          <a href={url}>WEBM</a>
          or
          <a href={url}>MP4</a>
          video. */}
        </video>
        <div ref={controlRef} className='show-controls'>
          <ul id="video-controls" className="controls" >
            <div className='flex-container'>
              <li>
                <button id="playpause" type="button" onClick={handlePlayPause}>
                  {
                    isPlay ?
                      <SvgItem href='#icon-pause' />
                      :
                      <SvgItem href='#icon-play' />
                  }
                </button>
              </li>
              <li><button id="stop" type="button" onClick={handleStop}><SvgItem href='#icon-repeat' /></button></li>
            </div>


            <div className='flex-container'>
              <li id='volume'>
                {showRange ? <input type="range" min="0" max="100" step={1} value={volumeNum} onClick={setVolume} onInput={setVolume} /> : null}
                <button type='button' onClick={() => setShowRange(!showRange)}><SvgItem href={isMute ? '#icon-sound-off' : '#icon-sound-on'} /></button>
              </li>
              {/*  <li>
                <button id="mute" type="button" onClick={handleMute}>
                  {
                    isMute ?
                      <SvgItem href='#icon-sound-off' />
                      :
                      <SvgItem href='#icon-sound-on' />
                  }
                </button>
              </li>
              <li><button id="volinc" type="button" onClick={handleVolinc}><SvgItem href='#icon-volume-up' /></button></li>
              <li><button id="voldec" type="button" onClick={handleVoldec}><SvgItem href='#icon-volume-down' /></button></li> */}
              <li>
                {
                  type === 'mp4' &&
                  <button id='download' type='button'>
                    <a href={url} download target='_blank'><SvgItem href='#icon-download' /></a>
                  </button>
                }
              </li>
              <li>
                <button id="fs" type="button" onClick={handleFS}>
                  {
                    isFs ?
                      <SvgItem href='#icon-fullscreen-exit' />
                      :
                      <SvgItem href='#icon-fullscreen-enter' />
                  }
                </button>
              </li>
            </div>
          </ul>
          {/* 进度条 */}
          <li className="progress">
            <progress id="progress" value={progress} max={100} onClick={handleSkip}>
              <span id="progress-bar"></span>
            </progress>
          </li>
        </div>
      </div>
    </>
  )
}
