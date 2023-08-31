import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import schedule from 'node-schedule'
import { getData, sendMails } from './microservices/email.js'

import emailRoute from './routes/email.js'
// import job from './microservices/email.js'

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
const connection = mongoose.connection
// const collection = connection.db.collection()

const port = process.env.PORT

app.use('/api', emailRoute);
const sendEmailsDaily = () => {
    try {
        // Code to send emails using a mailer library (e.g., nodemailer)
        // Implement your email sending logic here
        console.log('Sending emails:');
    } catch (error) {
        console.error('Error sending emails:', error);
    }
};

// getData()
// sendMails()
// schedule.scheduleJob(' * * * * *', sendEmailsDaily)
// Schedule to send mail every one minute - for testing
// schedule.scheduleJob(' * * * * *', sendMails)



app.listen(port, () =>
    console.log(`Node server listening at http://localhost:${port}`)
);