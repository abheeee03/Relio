"use client"
import Nav from '@/components/Nav'
import { ThemeToggleButton } from '@/components/ThemeToggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { addWebsite, getUserData } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const linksData = [
    {
        id: "6fef0567-3de0-4d07-ba4c-0001",
        url: "https://www.google.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0002",
        url: "https://www.youtube.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0003",
        url: "https://www.github.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0004",
        url: "https://stackoverflow.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Down" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0005",
        url: "https://twitter.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0006",
        url: "https://www.linkedin.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "inactive",
        ticks: { status: "Down" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0007",
        url: "https://www.instagram.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0008",
        url: "https://www.reddit.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0009",
        url: "https://medium.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "inactive",
        ticks: { status: "Down" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0010",
        url: "https://dev.to",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },

    {
        id: "6fef0567-3de0-4d07-ba4c-0011",
        url: "https://news.ycombinator.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0012",
        url: "https://openai.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0013",
        url: "https://vercel.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0014",
        url: "https://supabase.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Down" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0015",
        url: "https://firebase.google.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },

    {
        id: "6fef0567-3de0-4d07-ba4c-0016",
        url: "https://tailwindcss.com",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "inactive",
        ticks: { status: "Down" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0017",
        url: "https://react.dev",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    },
    {
        id: "6fef0567-3de0-4d07-ba4c-0018",
        url: "https://nodejs.org",
        user_id: "541e1ed3-38f2-40fa-be6a-user01",
        status: "active",
        ticks: { status: "Up" },
        user: "User"
    }
]

function Home() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [websitesData, setWebsitesData] = useState<WebsiteResponse[] | null>(null)
    const [newWebsiteModal, setNewWebsiteModal] = useState(false)
    const [newRegion, setNewRegion] = useState(false);
    const [newWebsiteURL, setNewWebsiteURL] = useState<string | null>(null);
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
                            https://
                            <Input onChange={(e)=>setNewWebsiteURL(e.target.value)} placeholder='google.com'/>
                        </div>
                    <DialogFooter>
                        <Button
                        onClick={async ()=>{
                            let response = await addWebsite(newWebsiteURL)
                            if(!response){
                                toast("Something went wrong")
                                return
                            }
                            toast("Website Added Successfully");
                            setNewWebsiteModal(false)
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
                        <Button onClick={()=>{setNewWebsiteModal(!newWebsiteModal)}} size={"sm"}>
                            Add Website
                        </Button>
                        <Button size={"sm"}>
                            Add Region
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
                            <>
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
                            
                            </>
                            {
                                !isLoading && websitesData && websitesData.map((w, idx)=>(
                                    <TableRow className='cursor-pointer' key={w.id} onClick={()=>{
                                        router.push(`/${w.id}`)
                                    }}>
                                        <TableCell>{idx+1}</TableCell>
                                        <TableCell>{w.url}</TableCell>
                                        <TableCell>
                                            <Badge variant={w.ticks[0].status === "Down" ? "destructive" : "secondary"}>
                                            {w.ticks[0].status}
                                            </Badge>
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


