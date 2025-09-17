import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router";

import './index.css'
import App from './App.tsx'
import { BackLog } from '@/modules/backlog/BackLogPage.tsx';
import { LoginPage } from '@/modules/login/LoginPage.tsx';

const beforeEnter = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login page if not authenticated
    // return redirect("/login");
  }
  return true; // Allow access
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: beforeEnter,
    children: [
      { index: true, Component: BackLog },
      {
        path: "sprint",
        element: <div>sprint</div>,
      },
      {
        path: "timeline",
        element: <div>timeline</div>,
      },
      {
        path: "login",
        element: <LoginPage />,
      }
    ],
  },
], {
  basename: "/my-vue-app"
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
