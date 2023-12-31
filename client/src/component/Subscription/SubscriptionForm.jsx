/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import "./subscriptionForm.css"

export const SubscriptionForm = ({ planDetail }) => {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const plan = planDetail.plan
    const price = planDetail.price
    console.log("plan", plan)

    const handleSubscription = async () => {
        try {
            const paymentMethod = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement('card')
            })
            const res = await fetch('http://localhost:2002/subscription', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    plan,
                    paymentMethod: paymentMethod.paymentMethod.id,
                })
            })
            console.log("payment response", res)
            if (!res.ok) {
                return alert('Payment unsuccessful')
            }
            const data = await res.json();
            const confirm = await stripe.confirmCardPayment(data.clientSecret)
            if (confirm.error) {
                return alert('Payment unsuccessful')
            }
            navigate('/subscription-completion', { replace: true })
            alert('Payment successful, subscription active')
        } catch (error) {
            console.log("Error", error)
            alert("Payment failed", error.message)
        }
    }

    return (
        <div className="subscription-form">
            <div className="order">
                <h2 className="order-title">Order Summary</h2>
                <h3>Billing Plan</h3>
                <h4>Selected Plan: {plan.toUpperCase()}</h4>
                <h4>Billed : &#8377;{price}<sub>/monthly</sub> </h4>
            </div>
            <h3 className="subscription-form-title">Enter Payment Details</h3>
            <div className="payment-form">
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" id="name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" id="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email" className="form-label">Card Details:</label>

                <div className="card-element">
                    <CardElement className="card" />
                </div>
                <button onClick={handleSubscription}>Subscribe</button>
            </div>
        </div>
    )
}
