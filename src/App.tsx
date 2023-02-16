import React from 'react';
// 开发测试
import VideoControl from '@/Components/index';

// 打包测试
// import VideoControl from '../lib/index';
// import '../lib/dist/index.css';

// 发布版本测试
// import VideoControl from 'du-videocontrol'; // 导入模块
// import 'du-videocontrol/lib/index.min.css'; // 导入样式
// Create WebSocket connection.
/* const socket = new WebSocket('ws://localhost:8100/rtsp');

// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data);
}); */

const url1 = 'ws://localhost:8100/rtsp?id=1ws://localhost:8100/rtsp?url=C:\Users\qaqhx\Videos\te.mp4&config=-b:v 500k'
const url2 = 'ws://localhost:8100/rtsp?id=2'

function App() {
  return (
    <div className="App">
      {/* https://www.w3schools.com/html/movie.mp4 */}
      {/* ws://127.0.0.1:8100/rtsp */}
      {/* <VideoControl type='mp4' style={{ width: 300, height: 170, margin: '0 auto' }} url='https://www.w3schools.com/html/movie.mp4' /> */}
      <div style={{ width: 400, height: 300, margin: '0 auto' }}>
        <VideoControl type='flv' url={url1}/>
      </div>
    {/*   <div style={{ width: 400, height: 300, margin: '0 auto' }}>
        <VideoControl type='flv' url={url2} />
      </div> */}
    </div>
  );
}

export default App;
