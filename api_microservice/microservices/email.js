import amqplib from 'amqplib'
import { sendMails } from '../services/sendEmail.js'
// const queueName = "SubscriptionEmail"

export const receiveMessage = async (queueName) => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, {
        durable: true
    })
    console.log("Waiting for the messages in queue :", queueName)
    channel.prefetch(1)
    channel.consume(queueName, async (msg) => {
        // const secs = msg.content.toString().split('.').length - 1
        console.log("Received:", msg.content.toString())
        await sendMails(msg.content.toString())
        console.log("Email sent to:", msg.content.toString())
        setTimeout(() => {
            console.log("Done the work process")
            channel.ack(msg)
        }, 1000)
    }, { noAck: false })
}
