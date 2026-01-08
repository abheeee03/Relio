"use client"
import Nav from '@/components/Nav'
import { ThemeToggleButton } from '@/components/ThemeToggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { addWebsite, getUserData, getWebsiteData } from '@/lib/actions'
import { WebsiteResponse } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'


function Home() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [websitesData, setWebsitesData] = useState<WebsiteResponse[] | null>(null)
    const [newWebsiteModal, setNewWebsiteModal] = useState(false)
    const [newWebsiteURL, setNewWebsiteURL] = useState<string | null>(null);
    const [checking, setChecking] = useState(false)
    const fetchData = async () => {
        setIsLoading(true)
        const websites = await getUserData();
        if(!websites.data){
            setIsLoading(false)
            console.log("nok websites");
            
            return
        }
        setWebsitesData(websites.data.websites)
        console.log("on client data: ", websites);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])
    

    return (
        <>
           <Nav/>
            <div className='min-h-screen w-full py-18'>
                <Dialog open={newWebsiteModal} onOpenChange={setNewWebsiteModal}>
                    <DialogContent>
                        <DialogHeader>
                            Add New Website
                        </DialogHeader>
                        <div className="px-1 flex items-center justify-center gap-1">
                            <Input onChange={(e)=>setNewWebsiteURL(e.target.value)} placeholder='google.com'/>
                        </div>
                    <DialogFooter>
                        <Button
                        onClick={async ()=>{
                            if(!newWebsiteURL){
                                toast("Please Enter a Url")
                                return
                            } else if (newWebsiteURL.includes("https://")){
                                let response = await addWebsite(newWebsiteURL)
                                if(!response){
                                    toast("Something went wrong")
                                    return
                                }
                                console.log(response);                            
                                toast("Website Added Successfully");
                                setNewWebsiteModal(false)
                            } else {
                                toast("Website url should start with https://")
                            }
                        }}
                        >
                            Start Monitoring
                        </Button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
                {/* sub navbar  */}
                <div className="w-full px-10 mt-5 flex items-center justify-between">
                    <h1 className='text-xl font-medium'>Monitoring Websites</h1>
                    <div className="flex items-center justify-center gap-3">
                        <Button onClick={async()=>{
                            setChecking(true)
                            const refreshData = await getUserData();
                            if(!refreshData.data){
                                setChecking(false)
                                return
                            } 
                            setChecking(false);
                            setWebsitesData(refreshData.data.websites)
                        }} size={"sm"}>
                            Refresh
                        </Button>
                        <Button onClick={()=>{setNewWebsiteModal(!newWebsiteModal)}} size={"sm"}>
                            Add Website
                        </Button>
                    </div>
                </div>
                {
                    !isLoading && !websitesData ? <div className="w-full h-full flex items-center justify-center">
                        No Websites Found, Try Adding One.
                    </div> : <div className="px-10 mt-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    No.
                                </TableHead>
                                <TableHead>
                                    URL
                                </TableHead>
                                <TableHead>
                                    Status
                                </TableHead>
                                <TableHead className='w-10'>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                isLoading && !websitesData && <> <TableRow>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className='w-full h-7'/>
                                </TableCell>
                            </TableRow>
                            </>
                            }

                            {
                                !isLoading && websitesData && websitesData.map((w, idx)=>(
                                    <TableRow className='cursor-pointer' key={w.id} onClick={()=>{
                                        router.push(`/${w.id}`)
                                    }}>
                                        <TableCell>{idx+1}</TableCell>
                                        <TableCell>{w.url}</TableCell>
                                        <TableCell>
                                            {
                                                w.ticks.length != 0 ? <Badge variant={w.ticks[0].status === "Down" ? "destructive" : "secondary"}>
                                                { checking ? "checking.." : w.ticks[0].status}
                                            </Badge> : <Badge>Not Available</Badge>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                                
                            }
                        </TableBody>
                    </Table>
                </div>                
                }
            </div>
        </>
    )
}

export default Home


