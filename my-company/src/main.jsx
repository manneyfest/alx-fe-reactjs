import React from 'react';
import ReactDOM from 'react-dom/client';
import RootApp from './App.jsx'; // Import RootApp, which contains BrowserRouter and App
import './index.css'; // Assuming you have an index.css for basic global styles (optional)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>,
);
