# 自动列表显示框（支持虚拟列表渲染）

**React 自动列表显示框：支持虚拟列表的自动滚动消息框。**

## 主要功能

- 支持虚拟列表渲染
- 支持自动滚动到最新消息
- 支持对组件样式进行自定义设置
- 鼠标移入/移除，显示/隐藏滚动条
- ---未完待续

## 参数

| 属性       | 描述                                   |
| ---------- | -------------------------------------- |
| style      | 容器自定义样式                         |
| className  | 容器自定义类名                         |
| isAuto     | 是否开启自动滚动最新数据（默认开启） |
| data       | 需要渲染的列表                         |
| height     | 容器高度                               |
| itemHeight | 容器内每个item的高度                   |

## 使用方式

#### 例子：

```tsx
import AutoList from 'du-autoList'; // 导入模块
import 'du-autoList/dist/index.css'; // 导入样式

// ...其他代码
// 组件使用
const data = (num: number) => 
  Array(num).fill(0).map((_, index) => <div style={{backgroundColor: '#ff0', height: '50px', border: '1px solid #ccc'}}>{`hahaha-${index}`}</div>)
;
<VirtualList height={500} data={data(num)} itemHeight={50}></VirtualList>
```