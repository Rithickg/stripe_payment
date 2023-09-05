import nodemailer from 'nodemailer';



export const sendMails = (email) => {

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

