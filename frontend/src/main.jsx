import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
} else {
  console.error("Root element not found");
}
