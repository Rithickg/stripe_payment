import { useNavigate } from "react-router-dom";
import './subscriptionPlan.css'
import Img from "../../assets/poster.jpg"

export const SubscriptionPlan = () => {
    const navigate = useNavigate()

    return (
        <div style={{
            backgroundImage: `url(${Img})`, backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}
            className="subscription-plan ">
            <h1 className="subscription-title">Subscription Plans</h1>
            <div className="plan-details">
                <div className="plan-basic plan">
                    <h1>Basic</h1>
                    <p>Limited access</p>
                    <p>Less feature</p>
                    <h4>&#8377;199 <sub>/month</sub></h4>
                    <button onClick={() => navigate('/subscription', { state: { plan: "basic", price: 199 } })}>START NOW</button>
                </div>
                <div className="plan-standard plan">
                    <h1>Standard</h1>
                    <p>Unlimited access</p>
                    <p>Weekly reports</p>
                    <h4>&#8377;399 <sub>/month</sub></h4>
                    <button onClick={() => navigate('/subscription', { state: { plan: "standard", price: 399 } })}>START NOW</button>
                </div>
                <div className="plan-premium plan">
                    <h1>Premium</h1>
                    <p>Unlimited access</p>
                    <p>Daily reports</p>
                    <p>Personal customization</p>
                    <h4>&#8377;599 <sub>/month</sub></h4>
                    <button className="button-32" onClick={() => navigate('/subscription', { state: { plan: "premium", price: 599 } })}>START NOW</button>
                </div>
            </div>
        </div>
    )
}
