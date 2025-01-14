import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'

import MyUserRoutes from './routes/MyUserRoutes'
import MyRestaurantRoutes from './routes/MyRestaurantRoutes'
import RestaurantRoutes from './routes/RestaurantRoute'
import OrderRoutes from './routes/OrderRoutes'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log('Connected to database!')
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()

app.use(express.json())
app.use(cors())

app.get('/health', async (req: Request, res: Response) => {
  res.send({ message: 'Health ok!' })
})

app.use('/api/my/user', MyUserRoutes)
app.use('/api/my/restaurant', MyRestaurantRoutes)
app.use('/api/restaurant', RestaurantRoutes)
app.use('/api/order', OrderRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
