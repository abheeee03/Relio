import { createClient } from "redis";

const client = await createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
}).on("error", (err)=>console.log("error while connecting to redis: ", err)).connect();


type WebsiteProp = {
    id: string,
    url: string
}

async function xAdd(w: WebsiteProp){
    await client.xAdd("relio:website", "*", {
        id: w.id,
        url: w.url
    })
}

export async function xAddBulk(w: WebsiteProp[]) {
    
    for(let i = 0; i < w.length; i++){
        await xAdd({
            id: w[i]!.id,
            url: w[i]!.url
        })
    }    
}

