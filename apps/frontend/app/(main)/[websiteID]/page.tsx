"use client"
import { PingingDotChart } from "@/components/ChartComp";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getWebsiteData } from "@/lib/actions";
import { Ticks, WebsiteData } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

function WebsiteDetails() {

  const {websiteID} = useParams();
  const [websiteData, setWebsiteData] = useState<null | WebsiteData>(null);
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  
  const getData = async ()=>{
    setLoading(true)
    const webData = await getWebsiteData(websiteID as string);
    setWebsiteData(webData);
    setLoading(false)
  }

  useEffect(() => {
      getData();
  }, [websiteID])

  const handelSort = (val: "USA" | "IN")=>{
    switch (val){
      case "USA":
        let updatedTicks = websiteData?.ticks.filter((a)=>a.region.name === "usa")
        
    }
  }
  
  
  return (
    <>
    <Nav/>
    {
      loading || !websiteData ? <div className="h-screen w-full flex gap-2 items-center justify-center">
         <Spinner/>
        <p className="text-lg">
         Please wait while we get data from server 
        </p>
      </div> : <div className='min-h-screen w-full flex flex-col items-start justify-start py-22 px-20'>
        <div className="w-full flex items-center justify-between">
            <Link href={`${websiteData.url}`} target="_blank" className="flex items-end justify-center group gap-1 cursor-pointer">
            <h1 className='text-3xl group-hover:underline transition-all'>{websiteData.url.replace("https://", "")} 
            </h1>
                <ArrowUpRight className="group-hover:opacity-100 opacity-0 transition-all duration-300" size={30}/> 
            </Link>
             <Badge>Current Status: {websiteData.ticks[0].status === "Up" ?  "Active" : "Inactive"}</Badge>
        </div>

        <div className="w-full flex items-start justify-between mt-5 gap-5">
            <div className="w-1/2">
            <PingingDotChart/>
            </div>

            <div className="w-1/2 h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                     <h1 className='text-xl font-medium'>Ping History</h1>
                </div>
                <div className="mt-6">
                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Region
                                </TableHead>
                                <TableHead>
                                    Response Time
                                </TableHead>
                                <TableHead className='text-right'>
                                    Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                    {
                        !websiteData.ticks || websiteData.ticks.length == 0 ? <div className="">Nothing to show here...</div> : websiteData.ticks.map((t: Ticks)=>(
                                <TableRow className='w-full' key={t.id}>
                                <TableCell className='w-90'>
                                    {t.region.name}
                                </TableCell>
                                <TableCell className='w-50'>
                                    {t.response_ms} ms
                                </TableCell>
                                <TableCell className='text-right w-90'>
                                    {t.status}
                                </TableCell>
                                </TableRow>
                    ))
                }
                    </Table>
                </div>
            </div>

        </div>

    </div>
    }
    </>
  )
}

export default WebsiteDetails