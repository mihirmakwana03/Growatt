import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  console.error("Root element not found");
}
