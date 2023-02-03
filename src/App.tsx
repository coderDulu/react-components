import React from 'react';
// 开发测试
// import VideoControl from '@/Components/index';

// 打包测试
import VideoControl from '../lib/index';
import '../lib/index.min.css';

// 发布版本测试
// import VideoControl from 'du-videocontrol'; // 导入模块
// import 'du-videocontrol/lib/index.min.css'; // 导入样式

function App() {
  return (
    <div className="App">
      <VideoControl style={{ width: 300, height: 170, margin: '0 auto' }} url='https://www.w3schools.com/html/movie.mp4' />
    </div>
  );
}

export default App;
