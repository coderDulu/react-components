interface propsType {
  style?: any; // 自定义样式
  className?: string; // 自定义类名
  url: string;  // 视频链接
}

export default function VideoControl(props: propsType): JSX.Element