import React from 'react';
// import ImageItem from '@/Components/index';

import ImageItem from '../lib';
import '../lib/dist/index.css';

// 发布版本测试
// import ImageItem from 'du-imageitem'; // 导入模块
// import 'du-imageitem/lib/index.min.css'; // 导入样式

function App() {
  return (
    <div className="App">
      <ImageItem src='https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'/>
    </div>
  );
}

export default App;
