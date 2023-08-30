import Stripe from 'stripe'

const stripe_secret = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(stripe_secret, {
    // apiVersion: "2022-08-01",
    apiVersion: "2023-08-16"
})




const stripeConfig = (req, res) => {
    res.status(200).json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
}


const subscriptions = async (req, res) => {
    try {
        const { name, email, paymentMethod } = req.body;
        // Create a customer
        const customer = await stripe.customers.create({
            email, name, payment_method: paymentMethod, invoice_settings: { default_payment_method: paymentMethod },
        })

        // Create a product
        const product = await stripe.products.create({
            name: "Newsletter Monthly Subscription",
        })

        // Create a subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {
                    price_data: {
                        currency: "INR",
                        product: product.id,
                        unit_amount: "59900",
                        recurring: {
                            interval: 'month'
                        }
                    }
                }
            ],
            payment_settings: {
                payment_method_types: ['card'],
                save_default_payment_method: 'on_subscription',
            },
            expand: ['latest_invoice.payment_intent']
        })
        // Send back the client secret
        res.json({
            message: "Subscription successful",
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export default { stripeConfig, subscriptions }