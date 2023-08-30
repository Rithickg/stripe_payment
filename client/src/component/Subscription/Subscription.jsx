import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
import { PaymentForm } from "./PaymentForm";
import { useLocation } from "react-router-dom";


export const Subscription = () => {
    const location = useLocation()
    const planDetail = location.state
    console.log("location", location)
    const [stripePromise, setStripePromise] = useState(null);

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


    return (
        <>
            <h1>React Stripe and the Payment Element</h1>

            {stripePromise && (
                <Elements stripe={stripePromise} >
                    <PaymentForm planDetail={planDetail} />
                </Elements>
            )}
        </>
    );
}

