import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Stripe from 'stripe'


const app = express();
app.use(express.json())
app.use(cors())
dotenv.config({ path: "./.env" });

const stripe_secret =process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(stripe_secret,{
  apiVersion:"2022-08-01",
    // apiVersion:"2023-08-16"
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
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Error",error)
     res.status(400).json({
      error: {
        message: e.message,
      },
    });
  }
});

const port =process.env.PORT 

app.listen(port, () =>
  console.log(`Node server listening at http://localhost:${port}`)
);