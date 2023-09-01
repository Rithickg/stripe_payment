import schedule from 'node-schedule'
import nodemailer from 'nodemailer';
import axios from 'axios'

export const getData = async () => {
    const res = await axios.get("http://localhost:2002/api/subscription/user")
    const user = res.data.User
    const emails = []
    user.map((data) => {
        emails.push(data.email)
    })
    console.log("emails", emails)
    console.log(res.data.User)
    return emails;
}



export const sendMails = (email) => {
    // const emails = getData()

    const gmail = process.env.gmail
    const gmail_pass = process.env.gmail_pass

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmail,
            pass: gmail_pass
        }
    })
    const message = {
        from: gmail,
        // to: emails.toString(),
        // to: "rithickg567@gmail.com, rithick2812@gmail.com",
        to: email,
        subject: "Subscription alert!",
        text: "Testing Subscription using Nodemailer",
        html: "<b>Welcome to the store with your new subscription</b>",
    }

    transporter.sendMail(message, (err) => {
        if (err) {
            console.log("Error", err)
        } else {
            console.log("Email successfully sent to :", email)
        }
    })
    console.log("Email sent ,Success!")
}

