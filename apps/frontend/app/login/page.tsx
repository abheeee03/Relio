import { ThemeToggleButton } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'

function page() {
  return (
    <div className='h-screen tracking-tight w-full flex items-center justify-center'>
        <div className="absolute top-5 right-5">
               <ThemeToggleButton start="top-down" variant="rectangle" />
            </div> 
        <Card>
            <CardTitle className='text-center font-semibold text-2xl'>
                Login
            </CardTitle>
            <CardContent>
                <div className="flex flex-col items-center justify-center gap-3">
                    <Input placeholder='Username'/>
                    <Input placeholder='Password'/>
                    <Button className='w-full'>Login</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default page