import React from 'react';
import '@/css/index.css';

import AutoScroll from './Components/index';
import AutoList from '@dudulu/autolist';
import '@dudulu/autolist/lib/dist/index.css';
// import AutoScroll from '../lib/index';
// import '../lib/dist/index.css';

// 发布版测试
// import AutoScroll from 'du-autoscroll';
// import 'du-autoscroll/dist/index.css';
const data = Array(20).fill('').map((_, index) => <div key={index}>{index}</div>)
function App() {
  return (
    <AutoList className='log' style={{width: 300}} data={data} itemHeight={50} height={300} />
  );
}

export default App;
