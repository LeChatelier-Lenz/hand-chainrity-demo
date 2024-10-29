import React from 'react';
import ErrorPage from "./error-page";
import ReactDOM from 'react-dom/client';
import App from './App';
import Root from './routes/root';
import DashBoard from './routes/dashboard';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Campaign from './pages/campaign';
import Launch from './pages/launch';
import User from './pages/user';

const router = createBrowserRouter([
  {
    path: '/root',
    element: < Root/>,
    errorElement:<ErrorPage />,
    children: [
      {
        path:'/root/campaign',
        element: <Campaign />,
      },
      {
        path:'/root/launch',
        element: <Launch />,
      },
      {
        path:'/root/user',
        element: <User />,
      },
    ]},
    {
      path:'/',
      element: <DashBoard />,
      errorElement:<ErrorPage />,
    },
    {
      path:'/admin',
    },
    {
      path:'/third-party'
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
