import React from 'react';
import '@/css/index.css';

import AutoScroll from './Components/index';

// import AutoScroll from '../lib/index';
// import '../lib/dist/index.css';

const data = Array(20).fill('').map((_, index) => <div key={index}>{index}</div>)
function App() {
  return (
    <AutoScroll style={{height: 500}}>
      {data}
    </AutoScroll>
  );
}

export default App;
