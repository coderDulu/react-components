import React from 'react';
// 开发测试
// import VideoControl from '@/Components/index';

// 打包测试
import VideoControl from '../lib/index';
import '../lib/dist/index.css';

// 发布版本测试
// import VideoControl from 'du-videocontrol'; // 导入模块
// import 'du-videocontrol/lib/index.min.css'; // 导入样式

function App() {
  return (
    <div className="App">
      {/* https://www.w3schools.com/html/movie.mp4 */}
      {/* ws://127.0.0.1:8100/rtsp */}
      {/* <VideoControl type='mp4' style={{ width: 300, height: 170, margin: '0 auto' }} url='https://www.w3schools.com/html/movie.mp4' /> */}
      <div style={{ width: 400, height: 300, margin: '0 auto' }}>
        <VideoControl type='flv' url='ws://127.0.0.1:8100/rtsp' />
      </div>
    </div>
  );
}

export default App;
