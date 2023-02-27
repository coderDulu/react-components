import React, { useEffect, useReducer, useRef, ReactElement } from 'react'
import styles from './index.module.less';

interface dataType {
  startIndex: number;
  endIndex: number;
  bufferNum: number;
  limit: number;
  currentIndex: number;
}

interface propsType {
  data: any[];  // 渲染的数据
  itemHeight: number; // item的高度
  height: number | string;     // 可视区高度
  isAuto?: boolean;   // 是否开启自动滚动（默认不开启）
  className?: string; // 类名
  style?: any;     // 样式
}

const initData: dataType = {
  startIndex: 0,  // 可视区域开始下标
  endIndex: 0,    // 可视区域结束下标
  bufferNum: 4,   // 缓冲区个数（成对，上下个有个缓冲）
  limit: 0,       // 可视区显示个数
  currentIndex: 0,   // 上一次的currentIndex
}

function reducer(state: dataType, action: any): dataType {
  switch (action.type) {
    case "set":
      return {
        ...state,
        ...action.payload
      }
    default:
      return { ...state }
  }
}

export default function virtualList(props: propsType) {
  const { data, itemHeight, height, isAuto = false, style, className } = props;

  const contentRef = useRef<HTMLDivElement>(null);  // 所有内容
  const visualRef = useRef<HTMLDivElement>(null);     // 可视区高度
  const lastScrollTop = useRef(0);  // 记录上一次的scrollTop

  const [state, dispatch] = useReducer(reducer, initData);

  // 初始显示
  useEffect(() => {
    if (visualRef.current) {
      const visualRef_clientHeight = visualRef.current.clientHeight;    // 获取clientHeight
      const limit = Math.ceil(visualRef_clientHeight / itemHeight);   // 获取渲染区域显示个数

      dispatch({
        type: "set",
        payload: {
          endIndex: Math.min(state.startIndex + state.bufferNum + limit, data.length - 1),
          limit
        }
      })
    }
  }, [])

  // 自动滚动
  useEffect(() => {
    const overflowY = visualRef.current?.style.overflowY;
    const isOverflowY = !overflowY || overflowY === 'hidden'; // 滚动条不显示则自动滚动

    if (isAuto && visualRef.current && isOverflowY) {
      const { scrollHeight, scrollTop } = visualRef.current;
      const diffNum = scrollTop - lastScrollTop.current;  // 用于判断是否启用behavior: smooth

      lastScrollTop.current = scrollTop
      visualRef.current.scrollTo({
        top: scrollHeight,
        behavior: diffNum !== itemHeight ? 'auto' : 'smooth'
      })
    }
  }, [data])

  // 监听滚动事件
  function onScroll(e: any) {
    if (e.target === visualRef.current) {

      const { scrollTop } = e.target;
      const currentIndex = Math.floor(scrollTop / itemHeight);
      // console.log(currentIndex, state.currentIndex, scrollTop);

      if (currentIndex !== state.currentIndex) {
        const { bufferNum, limit } = state;
        const endIndex = Math.min(currentIndex + bufferNum + limit, data.length - 1);

        // requestAnimationFrame(() => {
        dispatch({
          type: "set",
          payload: {
            startIndex: Math.max(currentIndex - bufferNum, 0),
            endIndex,
            currentIndex
          }
        })
        // });
      }
    }
    e.preventDefault();
  }

  // 渲染列表
  function renderOfList() {
    const { startIndex, endIndex } = state;
    const content: ReactElement[] = [];

    for (let i = startIndex; i <= endIndex; i++) {
      const item = data[i];
      content.push(<div className={styles.listItem} key={i} style={{ top: i * itemHeight, height: itemHeight }}>{item}</div>)
    }
    return content;
  }

  // 处理鼠标移入移出
  function handleMouse(e: any, type: string) {
    if (visualRef.current) {
      visualRef.current.style.overflowY = type;
    }
  }


  return (
    <div>
      {/* 可视区 */}
      <div
        className={`${styles.listVisual} ${className ?? ''}`}
        ref={visualRef}
        onScroll={onScroll}
        style={{ height, ...style }}
        onMouseEnter={e => handleMouse(e, 'auto')}
        onMouseLeave={e => handleMouse(e, 'hidden')}

      >
        <div className={styles.listContent} ref={contentRef} style={{ height: data.length * itemHeight }}>
          {
            renderOfList()
          }
        </div>
      </div>
    </div>
  )

}
