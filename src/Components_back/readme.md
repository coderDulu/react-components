# 消息自动滚动显示框

**React 消息自动滚动显示框：组件内的内容超出自动滚动，显示最新内容。**

## 主要功能

- 支持聊天消息自动滚动，显示最新消息。
- 支持日志打印自动显示。
- 支持对组件样式进行自定义设置，需设置style/className（注意css优先级）。
- 内容超出高度时：鼠标移入后显示滚动条，移出则隐藏且继续自动滚动到最新消息。
- ---未完待续

## 参数

| 属性          | 描述                                             |
| ------------- | ------------------------------------------------ |
| style         | 自定义样式                                       |
| className     | 类名                                             |
| onContextMenu | 组件右键触发事件，可用于给组件添加鼠标右键事件。 |
| isAuto        | 是否自动滚动到底部                               |
| children      | 传入的内容（组件/文本）                          |
## 使用方式

#### 例子：

```tsx
import { AutoScroll } from 'du-react-common'; // 导入模块
import 'du-react-common/lib/index.css'; // 导入样式

 <AutoScroll>
    {
      Array(24).fill('').map((_, index) => <div key={index}>{index}</div>)
    }
</AutoScroll>
```