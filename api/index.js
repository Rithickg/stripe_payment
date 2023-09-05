import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Stripe from 'stripe'
import mongoose from 'mongoose'
import User from './models/User.js'
// import paymentRoute from './routes/payment.js'
import userRoute from './routes/user.js'
import { sendMessage } from './microservices/subscriptionEmail.js'


const app = express();
app.use(express.json())
app.use(cors())
dotenv.config({ path: "./.env" });

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log("Connected to Mongodb Application..."))
  .catch((err) => console.log(err))

const stripe_secret = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(stripe_secret, {
  // apiVersion: "2022-08-01",
  apiVersion: "2023-08-16"
})



app.post("/config", (req, res) => {
  res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});


app.post("/subscription", async (req, res) => {
  try {
    const { name, email, plan, paymentMethod } = req.body;
    console.log("body", req.body)

    let price;

    if (plan == 'basic') {
      price = "19900"
    } else if (plan == 'standard') {
      price = "39900"
    }
    else {
      price = "59900"
    }
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
            // unit_amount: "59900",
            unit_amount: price,
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

    //post the subscription data in the database
    const newSubscription = new User({
      name: name,
      email: email,
      plan: plan,
      customerId: customer.id,
      subscriptionId: subscription.id,
      subscriptionStatus: 'active'
    })

    const saveSubscription = await newSubscription.save()
    await sendMessage("SubscriptionEmail", email)
    console.log("saveSubs", saveSubscription)

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

//Cancel Subscription 
app.post('/subscription/cancel', async (req, res) => {
  try {
    const { userId } = req.body
    const user = await User.findById(userId)
    console.log('user', user)
    const subscriptionId = user.subscriptionId
    console.log('subscriptionId', subscriptionId)

    if (user) {
      const deleted = await stripe.subscriptions.cancel(subscriptionId);
      const updateUser = await User.findByIdAndUpdate(userId, { $set: { subscriptionStatus: "inactive" } }, { new: true })
      res.json({
        message: "Subscription Cancelled!",
        user: updateUser,
        deleted
      })
    } else {
      res.status(500).json({ message: "User not found or Subscription not available" })

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" })
  }

})

app.post('/payment', async (req, res) => {
  try {
    // const { amount } = req.body;
    const amount = 4000
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'INR',
      payment_method_types: ['card']
    })
    const clientSecret = payment.client_secret;
    res.json({
      clientSecret,
      message: "Payment initiated successfully!"
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" })
  }
})

app.use('/api', userRoute);


const port = process.env.PORT

app.listen(port, () =>
  console.log(`Node server listening at http://localhost:${port}`)
);