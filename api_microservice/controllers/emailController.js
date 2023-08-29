import nodemailer from 'nodemailer';

const emailSubscribe = async (req, res) => {

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
        to: "rithickg567@gmail.com, rithick2812@gmail.com",
        subject: "Subscription alert!",
        text: "Testing Subscription using Nodemailer",
        html: "<b>Welcome to the store with your new subscription</b>",
    }

    transporter.sendMail(message, (err) => {
        if (err) {
            console.log("Error", err)
        } else {
            console.log("Email sent!")
            res.status(200).json({
                message: "You have subscribed to receive email"
            })
        }
    })
}

const sendMail = async (req, res) => {
    res.status(200).json("Mail Successful!")
}
export default { emailSubscribe, sendMail }