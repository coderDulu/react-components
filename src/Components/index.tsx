import React, { useState } from 'react';
import cssModule from './index.module.less';
import Modal from './modal'

interface imageType {
  src: string;
  width?: number;
}

// 图片组件
export default function ImageItem(props: imageType) {
  const { src } = props
  const [isPreview, setIsPreview] = useState(false);

  const handleCancel = (e: any) => {
    setIsPreview(false);
    e.stopPropagation();
  }
  return (
    <>
      <div className={cssModule.img}>
        <img src={src} alt="images"  onClick={() => { setIsPreview(true) }} />
      </div>
      <Modal show={isPreview} src={src} onCancel={handleCancel}></Modal>
    </>
  )
}


