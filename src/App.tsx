import React from 'react';
import '@/css/index.css';

import AutoScroll from './Components/index';
// import AutoScroll from '../lib/index';
// import '../lib/dist/index.css';

// 发布版测试
// import AutoScroll from 'du-autoscroll';
// import 'du-autoscroll/dist/index.css';

function App() {
  return (
    <div className="App">
      <div className='log'>
        {<AutoScroll>
          {
            Array(20).fill('').map((_, index) => <div key={index}>{index}</div>)
          }
        </AutoScroll>}
      </div>
      <div className='footer'></div>
    </div>
  );
}

export default App;
