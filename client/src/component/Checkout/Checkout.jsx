import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

export const Checkout = () => {
    const stripe = useStripe()
    const elements = useElements()

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
