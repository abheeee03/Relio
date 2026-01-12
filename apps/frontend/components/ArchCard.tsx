import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { Description } from '@radix-ui/react-dialog'
import { Ros } from '@/app/page'

function ArchCard({ title, description }: { title: string, description: string }) {
    return (
        <div className="max-w-sm px-10 py-10 shadow-xl border-t-3 rounded-lg">
            <div className="mb-5">
                <h1 className={`text-4xl ${Ros.className}`}>{title}</h1>
            </div>
            <div className="text-white/80">{description}</div>
        </div>
    )
}

export default ArchCard