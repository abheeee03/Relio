"use client"
import { ChartBarInteractive } from "@/components/ChartComp";
import Nav from "@/components/Nav";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteWebsite, getWebsiteData } from "@/lib/actions";
import { Ticks, WebsiteData } from "@/lib/types";
import { ArrowUpRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

function WebsiteDetails() {

    const { websiteID } = useParams();
    const router = useRouter();
    const [websiteData, setWebsiteData] = useState<null | WebsiteData>(null);
    const [loading, setLoading] = useState(false)
    const [checking, setChecking] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const getData = async () => {
        setLoading(true)
        const webData = await getWebsiteData(websiteID as string);
        setWebsiteData(webData);
        setLoading(false)
    }

    useEffect(() => {
        getData();
    }, [websiteID])

    const handelSort = (val: "USA" | "IN") => {
        switch (val) {
            case "USA":
                let updatedTicks = websiteData?.ticks.filter((a) => a.region.name === "usa")

        }
    }

    const handleDelete = async () => {
        setDeleting(true)
        const result = await deleteWebsite(websiteID as string)
        setDeleting(false)
        if (result.success) {
            setDeleteDialogOpen(false)
            router.push('/websites')
        }
    }


    return (
        <>
            {
                loading || !websiteData ? <div className="h-screen w-full flex gap-2 items-center justify-center">
                    <Spinner />
                    <p className="text-lg">
                        Please wait while we get data from server
                    </p>
                </div> : <div className='min-h-screen w-full flex flex-col items-start justify-start px-7'>
                    <div className="w-full flex items-center justify-between">
                        <AnimatedLink href={`${websiteData.url}`} className="text-3xl">
                            {websiteData.url.replace("https://", "")}
                        </AnimatedLink>
                        <div className="flex items-center gap-3">
                            <Badge>Current Status: {websiteData.ticks[0].status === "Up" ? "Active" : "Inactive"}</Badge>
                            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Delete Website</DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete this website? This action cannot be undone
                                            and all monitoring data will be permanently removed.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                                            {deleting ? <><Spinner /> Deleting...</> : "Delete"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <div className="w-full flex items-start justify-between mt-10 gap-5">

                        <div className="w-1/2 mt-2">
                            <ChartBarInteractive />
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
                                        !websiteData.ticks || websiteData.ticks.length == 0 ? <div className="">Nothing to show here...</div> : websiteData.ticks.map((t: Ticks) => (
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