import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // import of bootstrap into main application
import router from './configurations/router';
import { RouterProvider } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider 
      router={router} 
    />
  </StrictMode>,
)
