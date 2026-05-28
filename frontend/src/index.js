// ============================================================
// index.js — The entry point of the React application
//
// ReactDOM.createRoot finds the <div id="root"> in index.html
// and mounts our entire React app inside it.
// ============================================================

import React    from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global CSS (applied to every page)
import App      from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // StrictMode runs extra checks in development to catch bugs early
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
