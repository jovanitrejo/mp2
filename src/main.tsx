import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './configurations/router';
import { RouterProvider } from 'react-router';

import './index.css'
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // import of bootstrap into main application


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider
      router={router}
    />
  </StrictMode>,
)
