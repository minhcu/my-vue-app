import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import './index.css'
import App from './App.tsx'
import { BackLog } from '@/modules/backlog/BackLogPage.tsx';
import { LoginPage } from '@/modules/login/LoginPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: BackLog },
      {
        path: "/sprint",
        element: <div>sprint</div>,
      },
      {
        path: "/timeline",
        element: <div>timeline</div>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
