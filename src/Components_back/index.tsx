import React, { useEffect, useRef } from 'react'
import styles from './index.module.less';
import VirtualList from '../pages/virtualList';


interface propsType {
  children: any;
  style?: any;
  className?: any;
  onContextMenu?: (e: any) => void;
  isAuto?: boolean;
}

export default function autoScroll(props: propsType) {
  const { isAuto = true } = props;
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    const status = scrollRef.current.style.overflowY;
    
    isAuto && (status === 'hidden' || !status) && scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    })
  })

  function handleMouseEnter(e: any, type: string) {
    scrollRef.current.style.overflowY = type
  }

  return (
    <div
      style={props.style}
      className={`${styles.scroll} ${props.className} `}
      ref={scrollRef}
      onMouseEnter={e => handleMouseEnter(e, 'auto')}
      onMouseLeave={e => handleMouseEnter(e, 'hidden')}
      onContextMenu={props.onContextMenu}
    >
      <VirtualList height={500} data={props.children} itemHeight={50}></VirtualList>
    </div>
  )
}