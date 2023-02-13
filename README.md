# 视频播放控制组件

**React 基于flvjs的视频播放组件**

## 主要功能
- 使用了flvjs对url进行播放
- 重写了播放器控制部分
- 支持`flv（rtsp）`、`mp4`类型等媒体播放
- ---未完待续

## 主要参数



| 字段        | 类型     | 描述                                                                          |
| ----------- | -------- | ----------------------------------------------------------------------------- |
| `className` | `string` | 类名名                                                                        |
| `styles`    | `object` | 样式                                                                          |
| `type`      | `string` | 媒体类型，`'flv'` or `'mp4'`                                                  |
| `url`       | `string` | 表示媒体 URL，可以以 'https(s)' 或 'ws(s)' (WebSocket) 开头                   |
| `其他参数`  | `any`    | <https://github.com/bilibili/flv.js/blob/master/docs/api.md#flvjsissupported> |

## 使用方式

#### 例子：

```tsx
import ImageItem from 'du-videocontrol'; // 导入模块
import 'du-videocontrol/dist/index.css'; // 导入样式

...
// type is mp4
 <VideoControl style={{width: 400, height: 300}} type="mp4" url='https://www.w3schools.com/html/movie.mp4'/>

//  type is flv
 <VideoControl style={{width: 400, height: 300}} type="flv" url='ws://127.0.0.1:8100/rtsp'/>
```