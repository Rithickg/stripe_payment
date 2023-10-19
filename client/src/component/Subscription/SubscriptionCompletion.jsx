import "./subscriptionCompletion.css"
import Img from '../../assets/poster.jpg'


export const SubscriptionCompletion = () => {
    return (
        <div style={{
            backgroundImage: `url(${Img})`, backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }} className="subscription-completion">
            <h1 className="text">Payment Successful!</h1>
            <h2 className="text-1">Your Subscription is active!</h2>
            <h2 className="text-1">Thank You</h2>
        </div>
    )
}
