import express, { RequestHandler } from 'express'

import MyUserController from '../controllers/MyUserController'
import { jwtCheck, jwtParse } from '../middleware/auth'
import { validateMyUserRequest } from '../middleware/validation'
import { ValidationChain } from 'express-validator'

const router = express.Router()

router.get('/', jwtCheck, jwtParse, MyUserController.getCurrentUser as RequestHandler)
router.post('/', jwtCheck, MyUserController.createCurrentUser as RequestHandler)
router.put(
  '/',
  jwtCheck,
  jwtParse,
  validateMyUserRequest as ValidationChain[],
  MyUserController.updateCurrentUser as RequestHandler,
)

export default router
