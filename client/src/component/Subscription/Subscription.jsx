import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
import './subscription.css'
import { SubscriptionForm } from "./SubscriptionForm";
import { useLocation } from "react-router-dom";
import Img from '../../assets/poster.jpg'


export const Subscription = () => {
    const location = useLocation()
    const planDetail = location.state
    console.log("location", location)
    const [stripePromise, setStripePromise] = useState(null);

    useEffect(() => {
        const getPublishableData = async () => {
            try {
                const res = await axios.post("http://localhost:2002/config")
                const publishableKey = res.data.publishableKey
                setStripePromise(loadStripe(publishableKey));

            } catch (error) {
                console.log("Error", error)
            }
        }
        getPublishableData()
    }, []);


    return (
        <div style={{
            backgroundImage: `url(${Img})`, backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }} className="subscription">
            {stripePromise && (
                <Elements stripe={stripePromise} >
                    <SubscriptionForm planDetail={planDetail} />
                </Elements>
            )}
        </div>
    );
}

