import express, { RequestHandler } from 'express'
import multer from 'multer'

import MyRestaurantController from '../controllers/MyRestaurantController'
import { jwtCheck, jwtParse } from '../middleware/auth'
import { validateMyRestaurantRequest } from '../middleware/validation'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }) // 5mb

router.get(
  '/',
  jwtCheck,
  jwtParse,
  MyRestaurantController.getMyRestaurant as RequestHandler,
)
router.post(
  '/',
  upload.single('imageFile'),
  validateMyRestaurantRequest as RequestHandler[],
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant as RequestHandler,
)
router.put(
  '/',
  upload.single('imageFile'),
  validateMyRestaurantRequest as RequestHandler[],
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurant as RequestHandler,
)

export default router
