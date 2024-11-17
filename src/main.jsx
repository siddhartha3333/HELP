import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter
    future={{
      v7_startTransition: true, // Enable React.startTransition early
      v7_relativeSplatPath: true, // Enable relative splat path changes
    }}
  >
    <App />
  </BrowserRouter>
);
