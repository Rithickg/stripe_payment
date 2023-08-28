import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"

export const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

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
                    paymentMethod: paymentMethod.paymentMethod.id,
                })
            })

            if (!res.ok) {
                return alert('Payment unsuccessful')
            }
            const data = await res.json();
            const confirm = await stripe.confirmCardPayment(data.clientSecret)
            if (confirm.error) {
                return alert('Payment unsuccessful')
            }
            alert('Payment successful, subscription active')
        } catch (error) {
            console.log("Error", error)
            alert("Payment failed", error.message)
        }
    }

    return (
        <div>
            <h1>PaymentForm</h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div>
                    <CardElement />
                </div>
                <button onClick={handleSubscription}>Subscribe</button>
            </div>
        </div>
    )
}
