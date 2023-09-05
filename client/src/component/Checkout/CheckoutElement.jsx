import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
import { Checkout } from "./Checkout";


export const CheckoutElement = () => {
    const [stripePromise, setStripePromise] = useState(null);

    useEffect(() => {
        const getPublishableData = async () => {
            try {
                const res = await axios.post("http://localhost:2002/config")
                const publishableKey = res.data.publishableKey
                // console.log("key", publishableKey)
                setStripePromise(loadStripe(publishableKey));

            } catch (error) {
                console.log("Error", error)
            }
        }
        getPublishableData()
    }, []);


    return (
        <>
            <h1>React Stripe and the Payment Element</h1>

            {stripePromise && (
                <Elements stripe={stripePromise} >
                    <Checkout />
                </Elements>
            )}
        </>
    );
}

