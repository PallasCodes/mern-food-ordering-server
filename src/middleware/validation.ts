import { NextFunction, Response, Request, RequestHandler } from 'express'
import { body, validationResult } from 'express-validator'

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array })
  }
  next()
}

export const validateMyUserRequest = [
  body('name').isString().notEmpty().withMessage('Name must be a string'),
  body('addressLine1').isString().notEmpty().withMessage('AddressLine1 must be a string'),
  body('city').isString().notEmpty().withMessage('City must be a string'),
  body('country').isString().notEmpty().withMessage('Country must be a string'),
  handleValidationErrors,
]

export const validateMyRestaurantRequest = [
  body('restaurantName').notEmpty().withMessage('Field restaurantName is required'),
  body('city').notEmpty().withMessage('Field city is required'),
  body('country').notEmpty().withMessage('Field country is required'),
  body('deliveryPrice')
    .isFloat({ min: 1 })
    .withMessage('Field deliveryPrice is must be a positive number'),
  body('estimatedDeliveryTime')
    .isInt({ min: 1 })
    .withMessage('Field estimatedDeliveryTime must be a positive number'),
  body('cuisines')
    .isArray()
    .withMessage('Field cuisines must be an array')
    .not()
    .isEmpty()
    .withMessage('Field cuisines cannot be empty'),
  body('menuItems').isArray().withMessage('Field menuItems must be an rray'),
  body('menuItems.*.name').notEmpty().withMessage('Field name in menuItem is required'),
  body('menuItems.*.price')
    .isFloat({ min: 1 })
    .withMessage('Field price in menuItem must be a positive number'),
  handleValidationErrors,
]
