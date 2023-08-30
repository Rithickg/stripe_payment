import { useNavigate } from "react-router-dom";

export const SubscriptionPlan = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Subscription Plans</h1>
            <div className="plan-basic">
                <h1>Basic</h1>
                <ul>
                    <li>Limited access</li>
                </ul>
                <h4>&#8377;199 <sub>/month</sub></h4>
                <button onClick={() => navigate('/subscription', { state: { plan: "basic" } })}>START NOW</button>
            </div>
            <div className="plan-standard">
                <h1>Standard</h1>
                <ul>
                    <li>Unlimited access</li>
                    <li>Weekly reports </li>
                </ul>
                <h4>&#8377;399 <sub>/month</sub></h4>
                <button onClick={() => navigate('/subscription', { state: { plan: "standard" } })}>START NOW</button>
            </div>
            <div className="plan-premium">
                <h1>Premium</h1>
                <ul>
                    <li>Unlimited access</li>
                    <li>Daily reports </li>
                    <li>Personal customization</li>
                </ul>
                <h4>&#8377;599 <sub>/month</sub></h4>
                <button onClick={() => navigate('/subscription', { state: { plan: "premium" } })}>START NOW</button>
            </div>
        </div>
    )
}
