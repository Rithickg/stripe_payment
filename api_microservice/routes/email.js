import express from "express"
import emailController from "../controllers/emailController.js";
const router = express.Router()


router.post('/user/subscribe', emailController.emailSubscribe)
router.post('/user/sendmail', emailController.sendMail)

export default router;