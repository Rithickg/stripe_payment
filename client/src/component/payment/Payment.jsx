import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
import { CheckoutForm } from "./CheckoutForm";


export const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getPublishableData = async () => {
      try {
        const res = await axios.get("http://localhost:2002/config")
        const publishableKey = res.data.publishableKey
        setStripePromise(loadStripe(publishableKey));

      } catch (error) {
        console.log("Error", error)
      }
    }
    getPublishableData()
  }, []);

  useEffect(() => {
    const getSecretData = async () => {
      try {
        const res = await axios.post("http://localhost:2002/create-payment-intent")
        const clientSecret = res.data.clientSecret
        setClientSecret(clientSecret)
      } catch (error) {
        console.log("Error", error)
      }
    }
    getSecretData()
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

