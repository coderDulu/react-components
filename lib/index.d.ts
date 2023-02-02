interface propsType {
  style?: any; // 自定义样式
  className?: string; // 自定义类名
  // height?: number;  // 组件高度
  onContextMenu?: () => void; // 右键触发事件
  isAuto?: boolean; // 是否自动滚动到底部
  children: any; // 传入的内容
}

export default function AutoScroll(props: propsType): JSX.Element
