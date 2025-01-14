import express, { RequestHandler } from 'express'

import { jwtCheck, jwtParse } from '../middleware/auth'
import OrderController from '../controllers/OrderController'

const router = express.Router()

router.get('/', jwtCheck, jwtParse, OrderController.getMyOrders as RequestHandler)

router.post(
  '/checkout/create-checkout-session',
  jwtCheck,
  jwtParse,
  OrderController.createCheckoutSession as RequestHandler,
)

router.post('/checkout/webhook', OrderController.stripeWebhookHandler as RequestHandler)

export default router
