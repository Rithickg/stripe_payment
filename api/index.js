import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Stripe from 'stripe'


const app = express();
app.use(express.json())
app.use(cors())
dotenv.config({ path: "./.env" });

const stripe_secret = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(stripe_secret, {
  // apiVersion: "2022-08-01",
  apiVersion: "2023-08-16"
})



app.get("/config", (req, res) => {
  res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 19,
      // payment_method: 'card',
      payment_method_types: ['card']
      // automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Error", error)
    res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
});

app.post("/subscription", async (req, res) => {
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
            unit_amount: "19900",
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


})



const port = process.env.PORT

app.listen(port, () =>
  console.log(`Node server listening at http://localhost:${port}`)
);