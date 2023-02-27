import React, { useEffect, useLayoutEffect, useReducer, useRef, useState, useCallback } from 'react'
import './virtualList.less';

interface dataType {
  startIndex: number;
  endIndex: number;
  bufferNum: number;
}

interface propsType {
  data: any[];  // 渲染的数据
  itemHeight: number; // item的高度

}

const initData: dataType = {
  startIndex: 0,  // 可视区域开始下标
  endIndex: 0,    // 可视区域结束下标
  bufferNum: 4,   // 缓冲区个数（成对，上下个有个缓冲）
}


export default function virtualList(props: propsType) {
  const { data, itemHeight } = props;

  const contentRef = useRef<HTMLDivElement>(null);  // 所有内容
  const visualRef = useRef<HTMLDivElement>(null);     // 可视区高度
  const [limit, setLimit] = useState(0);    // 可视区显示个数
  const [state, setState] = useState<dataType>(initData);

  function renderDisplayContent() {
    const sliceData = data.map((item, index) =>
      <div className='list-item' key={index} style={{ top: index * itemHeight, height: itemHeight }}>{item}</div>
    ).filter(Boolean);

    return sliceData;
  }


  useEffect(() => {
    const visualRef_clientHeight = visualRef.current!.clientHeight;    // 获取clientHeight
    const limit = Math.ceil(visualRef_clientHeight / itemHeight);   // 获取渲染区域显示个数
    setLimit(limit);
    setState({
      ...state,
      endIndex: limit
    })
  }, [])

  function onScroll(e: any) {
    if (e.target === visualRef.current) {
      const { scrollTop } = e.target;
      const startIndex = Math.floor(scrollTop / itemHeight);

      if (startIndex !== state.startIndex) {
        setState({
          ...state,
          startIndex,
          endIndex: startIndex + limit
        })
      }
    }

  }

  return (
    <div>
      <div className="list-visual" ref={visualRef} onScroll={onScroll} >
        {/* 可视区 */}
        <div className="list-content" ref={contentRef} style={{ height: data.length * itemHeight }}>
          {
            renderDisplayContent()
          }
        </div>
      </div>
    </div>
  )

}
