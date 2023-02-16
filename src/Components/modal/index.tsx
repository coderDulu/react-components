import React, { useState } from 'react';
import './index.less'
// import Button from '@/components/antd/button';
import { Button } from 'antd';
import { CloseOutlined, MinusSquareOutlined, PlusSquareOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';

interface propsType {
  show: boolean;
  src: string;
  onCancel: (e: any) => void;
}


export default function Modal({
  show,
  src,
  onCancel
}: propsType) {
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0)
  const step = 0.1;
  // 处理滚轮事件
  function handleWheel(e: any) {
    // console.log('2333', e.deltaY, scale);
    switch (e.deltaY) {
      case 100:
        // console.log('缩小');
        setScale(old => old >= step + 0.1 ? scale - step : old);
        break;
      case -100:
        // console.log('放大');
        setScale(scale + step);
        break;
    }
  }

  // 放大
  function handlePlus(e: React.MouseEvent<HTMLButtonElement>) {
    setScale(scale + step);
    e.stopPropagation();
  }
  // 缩小
  function handleMinus(e: React.MouseEvent<HTMLButtonElement>) {
    setScale(old => old > step + 0.1 ? scale - step : old);
    e.stopPropagation();
  }
  // 左旋
  function handleRedo(e: React.MouseEvent<HTMLButtonElement>) {
    setRotate(rotate + 90);
    e.stopPropagation();
  }
  // 右旋
  function handleUndo(e: React.MouseEvent<HTMLButtonElement>) {
    setRotate(rotate - 90);
    e.stopPropagation();
  }

  return (
    <div
      onWheel={handleWheel}
      contentEditable={false}
      className='mark'
      onClick={onCancel}
      style={{ visibility: show ? 'visible' : 'hidden' }}>
      <div className='edit'>
        <Button type='link' onClick={handleRedo} icon={<RedoOutlined />} />
        <Button type='link' onClick={handleUndo} icon={<UndoOutlined />} />
        <Button type='link' onClick={handlePlus} icon={<PlusSquareOutlined />} />
        <Button type='link' onClick={handleMinus} icon={<MinusSquareOutlined />} />
        <Button type='link' onClick={onCancel} icon={<CloseOutlined />} />
      </div>
      <img src={src} alt="images" style={{ transform: `scale(${scale}) rotate(${rotate + 'deg'})`}} />
    </div>
  )
}
