import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import userRouter from './router/user'
import websiteRouter from './router/website'
import { Authenticated } from './middleware';


const app = express()
app.use(express.json())
app.use('/user', userRouter)
app.use('/website', Authenticated,websiteRouter)

app.listen(8080)