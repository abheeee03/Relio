import express from 'express'
import userRouter from './router/user'
import websiteRouter from './router/website'
import { Authenticated } from './middleware';
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/user', userRouter)
app.use('/website', Authenticated,websiteRouter)

app.listen(8080)