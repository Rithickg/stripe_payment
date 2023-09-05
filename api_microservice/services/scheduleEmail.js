import schedule from 'node-schedule'
import axios from 'axios'
import { sendMails } from './sendEmail.js'

export const getData = async () => {
    const res = await axios.get("http://localhost:2002/api/subscription/user")
    const user = res.data.User
    const emails = []
    user.map((data) => {
        emails.push(data.email)
    })

    return emails.toString();
}

export const scheduleEmail = async () => {
    const email = await getData()
    console.log("Emailssss", email)
    //Scheduled email to send at every 30 minutes
    const job = schedule.scheduleJob(' 30 * * * *', function () {
        sendMails(email)
        console.log("cron job done at 1 minute")
    })
}

