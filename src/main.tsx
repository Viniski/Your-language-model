import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import AppContextsProvider from '@/contexts';
import App from './app';
import '@/styles/main.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextsProvider>
        <App />
      </AppContextsProvider>
    </BrowserRouter>
  </StrictMode>,
);
