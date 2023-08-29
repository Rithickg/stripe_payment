import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import emailRoute from './routes/email.js'

const app = express();
app.use(express.json())
app.use(cors())
dotenv.config({ path: "./.env" });


const port = process.env.PORT

app.use('/api', emailRoute);

app.listen(port, () =>
    console.log(`Node server listening at http://localhost:${port}`)
);