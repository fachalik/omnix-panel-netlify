import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app';
import './index.css';
import { AntdProvider } from '@/lib/AntdRegistry';
import TanstackQueryProvider from '@/lib/TanstackQueryProvider';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TanstackQueryProvider>
        <AntdProvider>
          <App />
        </AntdProvider>
      </TanstackQueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
