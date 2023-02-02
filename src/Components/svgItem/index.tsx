import React from 'react';
import './index.less';

interface propsType {
  href: string; // xlinkHref
}

export default function index({ href }: propsType) {
  return (
    <>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={href}></use>
      </svg>
    </>
  )
}
