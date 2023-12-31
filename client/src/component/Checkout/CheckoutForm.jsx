import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useNavigate } from "react-router-dom"

export const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const handleCheckout = async () => {
        try {
            const res = await fetch('http://localhost:2002/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json()
            const cardElement = elements.getElement(CardElement);
            const confirmPayment = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: { card: cardElement }
            })
            const { paymentIntent } = confirmPayment;
            if (paymentIntent.status === 'succeeded') {
                alert('Payment Successful!')
                navigate('/subscription-completion', { replace: true })
            } else {
                alert('Payment Failed!')
            }
        } catch (error) {
            console.error(error)
            alert("Payment failed!")
        }
    }
    return (
        <div>
            <h1>Checkout</h1>
            <div>
                <CardElement />
                <button onClick={handleCheckout}>Pay</button>
            </div>
        </div>
    )
}
