import React from 'react';

// import AutoScroll from '@/AutoScroll';

// import AutoScroll from '../lib/index';

// 发布版测试
import AutoScroll from 'du-autoscroll';
import 'du-autoscroll/lib/index.min.css';

function App() {
  return (
    <div className="App">
      <AutoScroll isAuto={true}>
        {
          Array(24).fill('').map((_, index) => <div key={index}>{index}</div>)
        }
      </AutoScroll>
    </div>
  );
}

export default App;
