import express from "express"
import paymentContorller from '../controllers/paymentController.js'
const router = express.Router()


router.get('/config', paymentContorller.stripeConfig)
router.post('/subscription', paymentContorller.subscriptions)


export default router;