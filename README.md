# 图片查看器

**React 图片预览器**

## 主要功能

- 图片放大查看
- 图片预览旋转、缩放等
- ---未完待续

## Version
### 1.1.1
- 更改缩放旋转方式
- 缩放幅度减小

### 1.1.0
- 添加d.ts文件说明
- 更改README.md

## 参数

| 属性 | 描述     |
| ---- | -------- |
| src  | 图片链接 |

## 使用方式

#### 例子：

```tsx
import ImageItem from 'du-imageitem'; // 导入模块
import 'du-imageitem/lib/dist/index.css'; // 导入样式

...
<ImageItem src='https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'/>
```