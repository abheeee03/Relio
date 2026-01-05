import { Router } from "express";
import prisma from "store/client";
import jwt from 'jsonwebtoken'

const userRouter = Router()

userRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.json({
            error: "username and password is req"
        })
        return
    }

    const response = await prisma.user.create({
        data: {
            username,
            password
        }
    })
    if(!response){
        res.json({
            error: "something went wrong"
        })
        return
    }
    res.json({
        data: response,
        msg: "Success"
    })

})
userRouter.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.json({
            error: "username and password is req"
        })
        return
    }

    const response = await prisma.user.findFirst({
        where: {
            username
        }
    })
    if(!response){
        res.json({
            error: "user not found"
        })
        return
    }
    if(response.password != password){
        res.json({
            erorr: "invalid id or pass"
        })
        return
    }
    const token = jwt.sign({userId: response.id}, process.env.JWT_SECRET as string)
    res.json({
        token,
        msg: "user is valid"
    })

})

export default userRouter

