"use client"
import Nav from '@/components/Nav'
import { ThemeToggleButton } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRouter } from 'next/navigation'

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
    return (
        <>
           <Nav/>
            <div className='min-h-screen w-full py-18'>
                {/* sub navbar  */}
                <div className="w-full px-10 flex items-center justify-between">
                    <h1 className='text-xl font-medium'>Monitoring Websites</h1>
                    <div className="flex items-center justify-center gap-3">
                        <Button size={"sm"}>
                            Add Website
                        </Button>
                        <Button size={"sm"}>
                            Add Region
                        </Button>
                    </div>
                </div>

                {/* websites  */}
                <div className="px-10">
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
                                linksData.map((link, idx) => (
                                    <TableRow onClick={()=>router.push(`/${link.id}`)} key={link.id}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>{link.url.replace("https://", "")}</TableCell>
                                            <TableCell>{link.status}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Home


