import { Router } from "express";
import prisma from "store/client";

const websiteRouter = Router()

websiteRouter.post('/create', async (req, res) => {
    const { url } = req.body;
    const userId = req.userId;
    console.log("Req recieved for ", url, " and for userId: ", userId);
    if (!url) {
        res.json({
            error: "url is req"
        })
        return
    }

    try {
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
    } catch (err) {
        console.log(err);
        res.json({
            error: "something went wrong"
        })
    }

})

websiteRouter.get('/status/:id', async (req, res) => {
    const { userId } = req.body;
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

    if (!website) {
        res.json({
            error: "Website not found"
        })
        return
    }

    res.json({
        data: website
    })

})
websiteRouter.get('/ticks/:id', async (req, res) => {
    const { userId } = req;
    const fromWebsiteId = req.params.id
    const website = await prisma.websites.findFirst({
        where: {
            user_id: userId,
            id: fromWebsiteId
        },
        include: {
            ticks: {
                include: {
                    region: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: [{
                    created_at: "desc"
                }]
            }
        }
    })

    if (!website) {
        res.json({
            error: "Website not found"
        })
        return
    }

    res.json({
        data: website
    })

})

websiteRouter.get('/all-ticks', async (req, res) => {
    const { userId } = req;
    const limit = parseInt(req.query.limit as string) || 15;
    const offset = parseInt(req.query.offset as string) || 0;

    try {
        const userWebsites = await prisma.websites.findMany({
            where: {
                user_id: userId
            },
            select: {
                id: true,
                url: true
            }
        })

        const websiteIds = userWebsites.map(w => w.id)
        const websiteMap = Object.fromEntries(userWebsites.map(w => [w.id, w.url]))

        const ticks = await prisma.ticks.findMany({
            where: {
                website_id: {
                    in: websiteIds
                }
            },
            include: {
                region: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            },
            take: limit,
            skip: offset
        })

        const totalCount = await prisma.ticks.count({
            where: {
                website_id: {
                    in: websiteIds
                }
            }
        })

        const ticksWithUrl = ticks.map(tick => ({
            ...tick,
            websiteUrl: websiteMap[tick.website_id] || ''
        }))

        res.json({
            data: ticksWithUrl,
            total: totalCount,
            hasMore: offset + limit < totalCount
        })
    } catch (err) {
        console.log(err);
        res.json({
            error: "Something went wrong"
        })
    }
})

export default websiteRouter