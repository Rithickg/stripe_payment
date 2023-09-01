import amqplib from 'amqplib'


export const sendMessage = async (queueName, message) => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, {
        durable: true
    })

    channel.sendToQueue(queueName, Buffer.from(message), {
        persistent: true
    })
    console.log('Messge sent to queue:', queueName)
    console.log('Message sent:', message)

    // setTimeout(() => {
    //     connection.close();
    //     process.exit(0)
    // }, 500)
}

