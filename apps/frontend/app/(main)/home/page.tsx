"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { getUserData } from "@/lib/actions"
import { WebsiteResponse } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [websitesData, setWebsitesData] = useState<WebsiteResponse[] | null>(null)
    const [newWebsiteModal, setNewWebsiteModal] = useState(false)
    const [newWebsiteURL, setNewWebsiteURL] = useState<string | null>(null);
    const [checking, setChecking] = useState(false)
    const [totalWebsites, settotalWebsites] = useState(0);
    const [DownW, setDownW] = useState(0)
    const [UpW, setUpW] = useState(0)
    const fetchData = async () => {
        setIsLoading(true)
        const websites = await getUserData();
        if(!websites.data){
            setIsLoading(false)
            console.log("nok websites");
            
            return
        }
        let website = websites.data.websites
        setWebsitesData(website)
        settotalWebsites(website.length);
        let down = website.filter((w: WebsiteResponse) => w.ticks[0].status == "Down").length
        let up = website.filter((w: WebsiteResponse) => w.ticks[0].status == "Up").length
        setDownW(down)
        setUpW(up)
        console.log("on client data: ", websites);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])


  return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" >
            {

             !websitesData && isLoading ? <Skeleton className="w-full h-full"/> :
            <div className="w-full h-full px-5 py-5">
            <h4 className="text-lg">Websites Monitoring</h4>
            <div className="border h-2/3 rounded-lg mt-3 px-5 py-1">
            <h1 className="text-7xl">{totalWebsites}</h1>
            <p className="mt-2">we are keeping an eye here</p>
            </div>
            </div>
            }
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl" >
            {

             !websitesData && isLoading ? <Skeleton className="w-full h-full"/> :
            <div className="w-full h-full px-5 py-5">
            <h4 className="text-lg">Active Websites</h4>
            <div className="border h-2/3 rounded-lg mt-3 px-5 py-1">
            <h1 className="text-7xl">{UpW}</h1>
            <p className="mt-2">everything is good here</p>
            </div>
            </div>
            }
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl" >
            {

             !websitesData && isLoading ? <Skeleton className="w-full h-full"/> :
            <div className="w-full h-full px-6 py-5">
            <h4 className="text-lg">Down Websites</h4>
            <div className="border h-2/3 rounded-lg mt-3 px-5 py-1">
            <h1 className="text-7xl">{DownW}</h1>
            {
              DownW === 0 ? <p className="">all good! nothing to worry about</p> : <p className="mt-2">this should be fixed</p>
            }
            </div>
            </div>
            }
            </div>
            
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
  )
}
