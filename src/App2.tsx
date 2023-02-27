import React, { useState } from 'react';
import '@/css/index.css';

// import VirtualList from './Components/index';
import VirtualList from '../lib/index';
import '../lib/dist/index.css';


const data = (num: number) => 
  Array(num).fill(0).map((_, index) => <div style={{backgroundColor: '#ff0', height: '50px', border: '1px solid #ccc'}}>{`hahaha-${index}`}</div>)
;


function App() {
  const [num, setNum] = useState(1000);
 /*  setTimeout(() => {
    setNum(num + 1);
  }, 1000); */
  return (
    <div className="App">
      <VirtualList height={500} data={data(num)} itemHeight={50}></VirtualList>
    </div>
  );
}

export default App;
