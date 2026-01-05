import { Router } from "express";
import prisma from "store/client";

const websiteRouter = Router()

websiteRouter.post('/create', async (req, res)=>{
    const {url} = req.body;
    const userId = req.userId;
    console.log("Req recieved for ", url, " and for userId: ", userId);    
    if(!url){
        res.json({
            error: "url is req"
        })
        return
    }

    try{
        const response = await prisma.websites.create({
            data: {
                user_id: userId!,
                url
            }
        })
        res.json({
            data: response,
            msg: "website created successfully"
        })
    } catch (err){
        console.log(err);        
        res.json({
            error: "something went wrong"
        })
    }

})

websiteRouter.get('/status/:id', async (req, res)=>{
    const {userId} = req.body;
    const fromWebsiteId = req.params.id
    const website = await prisma.websites.findFirst({
        where: {
            user_id: userId,
            id: fromWebsiteId
        },
        include: {
            ticks: {
                orderBy: [{
                    created_at: "desc"
                }],
                take: 1
            }
        }
    })

    if(!website){
        res.json({
            error: "Website not found"
        })
        return
    }

    res.json({
        data: website
    })

})
websiteRouter.get('/ticks/:id', async (req, res)=>{
    const {userId} = req.body;
    const fromWebsiteId = req.params.id
    const website = await prisma.websites.findFirst({
        where: {
            user_id: userId,
            id: fromWebsiteId
        },
        include: {
            ticks: {
                orderBy: [{
                    created_at: "desc"
                }]
            }
        }
    })

    if(!website){
        res.json({
            error: "Website not found"
        })
        return
    }

    res.json({
        data: website
    })

})

export default websiteRouter