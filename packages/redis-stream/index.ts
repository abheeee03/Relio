import { createClient } from "redis";

const client = await createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
}).on("error", (err)=>console.log("error while connecting to redis: ", err)).connect();


const REDIS_NAME = "relio:website"
// harding coding this worker number here, ideally this should be a id for different workers for different regions 
const worker_num = "1"

type WebsiteProp = {
    id: string,
    url: string
}

type StreamResponse = {
    name: string,
    messages: {
        id: string,
        message: {
            id: string,
            url: string
        }
    }[]
}[] | null


async function xAdd({url, id}: WebsiteProp) {
    await client.xAdd(
        REDIS_NAME, '*', {
            url,
            id
        }
    );
}

export async function xAddBulk(websites: WebsiteProp[]) {
    websites.forEach(async (w)=>{
        await xAdd({url: w.url, id: w.id})
    })
}

export async function xReadGroup(worker_id: string) : Promise<StreamResponse> {
    const res = await client.xReadGroup(
        worker_id,
        worker_num,
        {
            key: REDIS_NAME,
            id: '>'
        }, {
            COUNT: 5
        }
    )
    return res as StreamResponse
}

async function xAck(consumerGroup: string, eventId: string) {
    await client.xAck(REDIS_NAME, consumerGroup, eventId)
}

export async function xAckBulk(consumerGroup: string, eventIds: string[]) {
    eventIds.map(eventId => xAck(consumerGroup, eventId));
}