import axios from 'axios'
import {xAckBulk, xReadGroup} from 'redis-stream/client'
import prisma from 'store/client'


const REGION_ID = process.env.REGION_ID

if(!REGION_ID){
    throw new Error("worker website_id is required")
}

const pingWebsite = async (website_id: string, url: string)=>{
    return new Promise<void>((res)=>{
        const startTime = Date.now()
        axios.get(url).then(async ()=>{
            console.log("saved to db");            
            let endTime = Date.now()
            const resp = await prisma.ticks.create({
                data: {
                    response_ms: String(startTime - endTime),
                    status: "Up",
                    region_id: REGION_ID,
                    website_id: website_id,
                }
            })
            console.log(resp);            
            res()
        }).catch(async (err)=>{
            console.log("failed: ",err);            
            let endTime = Date.now()
            await prisma.ticks.create({
                data: {
                    response_ms: String(startTime - endTime),
                    status: "Down",
                    region_id: REGION_ID,
                    website_id: website_id,
                }
            })
            res()
        })

    })
}

const main = async () =>{
    while(1){
        const res = await xReadGroup(REGION_ID)
        if(!res || res.length === 0){
            continue;
        }
        //@ts-ignore
        const messages = res[0].messages
        for(let i = 0; i < messages.length; i++){
            console.log("res: ", messages[i]?.message);
        }        
        let promises = messages.map(async ({message}) => await pingWebsite(message.id, message.url))
        await Promise.all(promises)

        xAckBulk(REGION_ID, messages.map(({id})=>id))
        
    }
}



main()