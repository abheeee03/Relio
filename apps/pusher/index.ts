import { xAddBulk } from "redis-stream/client";
import prisma from "store/client";


async function main(){
    let websites = await prisma.websites.findMany({
        select: {
            id: true,
            url: true
        }
    })
    
    await xAddBulk(websites.map((w)=>({
        id: w.id,
        url: w.url
    })))
}


setInterval(() => {
    main()
}, 3 * 1000);

main()