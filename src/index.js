import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary'
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
  <ErrorBoundary>
  <App />
  </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

