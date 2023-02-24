import React from 'react';
import '@/css/index.css';

import VirtualList from './pages/virtualList';

const data = Array(100).fill(0).map((_, index) => <span>{'hahaha'}</span>);

function App() {
  return (
    <div className="App">
      <VirtualList data={data} itemHeight={50}></VirtualList>
    </div>
  );
}

export default App;
