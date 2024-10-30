import React from 'react';
import ErrorPage from "./error-page";
import ReactDOM from 'react-dom/client';
// import App from './App';
// import Root from './routes/oldRoot';
import DashBoard from './routes/dashboard';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
// import Campaign from './pages/campaign_old';
import User from './pages/user';
import SignInSide from './pages/sign-in-side/SignInSide';
import SignUp from './pages/sign-up/SignUp';
import ThirdParty from './routes/third-party';
import Admin from './routes/admin';
import Campaign from './pages/campaign/Campaign';
import Details from './pages/campaign/Details';
import Root from './routes/root';
import Launch from './pages/launch/launch';


const router = createBrowserRouter(
  // const [account, setAccount] = useState<string | null>(null)
  [
    {
      path: '/root',
      element: < Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/root/campaign',
          element: <Campaign />,
        },
        {
          path: '/root/launch',
          element: <Launch />,
        },
        {
          path: '/root/user',
          element: <User />,
        },
        {
          path: '/root/details/:id',
          element: <Details />,
        }
      ]
    },
    {
      path: '/',
      element: <DashBoard />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/admin',
      element: <Admin />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/signin',
      element: <SignInSide />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/signup',
      element: <SignUp />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/third-party',
      element: <ThirdParty />,
      errorElement: <ErrorPage />,
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
