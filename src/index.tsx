import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import App2 from './App2';

const root = document.getElementById('root');
if(root) {
  createRoot(root).render(<App />)
}
