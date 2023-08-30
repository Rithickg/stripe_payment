import express from 'express'
import userController from '../controllers/userController.js'


const router = express.Router()

router.get('/subscription/user', userController.subscription_user)

router.get('/subscription/user/:id', userController.subscription_user_by_id)


export default router;