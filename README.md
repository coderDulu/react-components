# 视频播放控制组件

**React 视频播放器控制组件**

## 主要功能

- 替代video标签默认的控制样式
- ---未完待续

## 参数

| 属性      | 描述       |
| --------- | ---------- |
| url       | 视频链接   |
| className | 类名       |
| style     | 自定义样式 |

## 使用方式

#### 例子：

```tsx
import ImageItem from 'du-videocontrol'; // 导入模块
import 'du-videocontrol/lib/index.min.css'; // 导入样式

...
 <VideoControl style={{width: 300, height: 300}} url='https://www.w3schools.com/html/movie.mp4'/>
```