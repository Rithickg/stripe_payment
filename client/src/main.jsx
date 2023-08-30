import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Payment } from './component/payment/Payment.jsx'
import { Completion } from './component/payment/Completion.jsx'
import { Subscription } from './component/Subscription/Subscription.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/subscription",
    element: <Subscription />,
  },
  {
    path: "/completion",
    element: <Completion />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
