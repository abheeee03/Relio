import React from 'react'
import Nav from './Nav'
import { Website } from '@/app/[websiteID]/page'
import { PingingDotChart } from './ChartComp'
import { Table, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

function WebsiteDetails({data}: {data: Website}) {
  return (
    <>
    <Nav/>
    <div className='min-h-screen w-full flex flex-col items-start justify-start py-22 px-20'>
        <div className="w-full flex items-center justify-between">
            <h1 className='text-3xl'>{data.url.replace("https://", "")}</h1>
            <span>Current Status: {data.ticks[0].status === "Up" ?  "Active" : "Inactive"}</span>
        </div>

        <div className="w-full flex items-start justify-between mt-5 gap-5">
            <div className="w-1/2">
            <PingingDotChart/>
            </div>

            <div className="w-1/2 h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                     <h1 className='text-xl font-medium'>Ping History</h1>
                     <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sort By Region"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='usa'>
                                USA
                            </SelectItem>
                            <SelectItem value='india'>
                                India
                            </SelectItem>
                        </SelectContent>
                     </Select>
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
                        data.ticks.map((t)=>(
                                <TableRow className='w-full' key={t.id}>
                                <TableCell className='w-90'>
                                    {t.region_id}
                                </TableCell>
                                <TableCell className='w-50'>
                                    {t.response_ms}
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
    </>
  )
}

export default WebsiteDetails