/**
 * 视频播放控制组件(用于替换原生的播放器控制组件)
 */
import React, { useEffect, useRef, useState } from 'react'
import './index.less';
import './font_fio1nvrgo2/iconfont';
import SvgItem from './svgItem';

export default function index({
  url,
  className,
  style
}: {
  url: string; // 视频播放链接
  className?: string;
  style?: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlRef = useRef<HTMLUListElement>(null); // 控制元素
  const [progress, setProgress] = useState(0);    // 播放进度条

  // 状态
  const [isPlay, setIsPlay] = useState(false);  // 是否播放
  const [isMute, setIsMute] = useState(false);  // 是否静音
  const [isFs, setIsFs] = useState(false);      // 是否最大化

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', () => {
        const newProgress = Math.floor(video.currentTime / video.duration * 100) ;
        console.log(newProgress)
        setProgress(_ => newProgress);
      })

      video.addEventListener('ended', () => { // 播放结束后,显示control
        setIsPlay(false);
        controlRef.current!.style.visibility = 'visible';
      })
    }

  }, [])

  // 播放视频
  function handlePlayPause() {
    if (videoRef.current?.ended || videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlay(true);
    } else {
      videoRef.current?.pause();
      setIsPlay(false);
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

  // 静音
  function handleMute() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMute(videoRef.current.muted);
    }
  }

  // 音量+
  function handleVolinc() {
    alterVolume('+');
  }

  // 音量-
  function handleVoldec() {
    alterVolume('-');
  }
  // 音量处理
  function alterVolume(dir: '+' | '-') {
    const video = videoRef.current;
    if (video) {
      const currentVolume = Math.floor(video.volume * 10) / 10;
      if (dir === '+' && currentVolume < 1) {
        video.volume += 0.1;
      } else if (dir === '-' && currentVolume > 0) {
        video.volume -= 0.1;
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
          <source src={url} type="video/mp4" />
          Download the
          <a href={url}>WEBM</a>
          or
          <a href={url}>MP4</a>
          video.
        </video>
        <ul id="video-controls" className="controls" ref={controlRef}>
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
          <li><button id="stop" type="button" onClick={handleStop}><SvgItem href='#icon-repeat'/></button></li>
          <li className="progress">
            <progress id="progress" value={progress} min="0" max={100} onClick={handleSkip}>
              <span id="progress-bar"></span>
            </progress>
          </li>
          <li>
            <button id="mute" type="button" onClick={handleMute}>
              {
                isMute ?
                  <SvgItem href='#icon-sound-off' />
                  :
                  <SvgItem href='#icon-sound-on' />
              }
            </button>
          </li>
          <li><button id="volinc" type="button" onClick={handleVolinc}><SvgItem href='#icon-volume-up'/></button></li>
          <li><button id="voldec" type="button" onClick={handleVoldec}><SvgItem href='#icon-volume-down'/></button></li>
          <li><button id="fs" type="button" onClick={handleFS}>
            {
              isFs ?
                <SvgItem href='#icon-fullscreen-exit' />
                :
                <SvgItem href='#icon-fullscreen-enter' />
            }
          </button></li>
        </ul>
      </div>
    </>
  )
}
