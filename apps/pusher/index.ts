import { xAddBulk } from "redis-stream/client";
import prisma from "store/client";


async function main(){
    let websites = await prisma.websites.findMany({
        select: {
            id: true,
            url: true
        }
    })

    console.log("pushing this shit to queue: ", websites);
        
    await xAddBulk(websites)
}


setInterval(() => {
    main()
}, 3 * 1000);

main()