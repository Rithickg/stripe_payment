import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CheckoutCompletion } from './component/Checkout/CheckoutCompletion.jsx';
import { Checkout } from './component/Checkout/Checkout.jsx';
import { SubscriptionPlan } from './component/SubscriptionPlan/SubscriptionPlan.jsx';
import { Subscription } from './component/Subscription/Subscription.jsx';
import { SubscriptionCompletion } from './component/Subscription/SubscriptionCompletion.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/pricing",
    element: <SubscriptionPlan />,
  },
  {
    path: '/subscription',
    element: <Subscription />
  },
  {
    path: '/subscription-completion',
    element: <SubscriptionCompletion />
  },
  {
    path: "/checkout",
    element: <Checkout />
  },
  {
    path: "/checkout-completion",
    element: <CheckoutCompletion />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
