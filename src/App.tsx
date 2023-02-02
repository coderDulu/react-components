import React from 'react';
import AutoScroll from '@/AutoScroll';

function App() {
  return (
    <div className="App">
      <AutoScroll isAuto={false} style={{ width: 300, height: 300 }}>
        {
          Array(24).fill('').map((_, index) => <div key={index}>{index}</div>)
        }
      </AutoScroll>
    </div>
  );
}

export default App;
