import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import { receiveMessage } from './microservices/email.js'
import emailRoute from './routes/email.js'
import { scheduleEmail } from './services/scheduleEmail.js'



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
// const connection = mongoose.connection
// const collection = connection.db.collection()

const port = process.env.PORT

app.use('/api', emailRoute);


//Scheduled email to send at every 30 minutes
// scheduleEmail()
receiveMessage("SubscriptionEmail")




app.listen(port, () =>
    console.log(`Node server listening at http://localhost:${port}`)
);