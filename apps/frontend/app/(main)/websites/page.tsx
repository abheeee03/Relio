"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { addWebsite, getUserData } from "@/lib/actions"
import { WebsiteResponse } from "@/lib/types"
import { ArrowUpRight, Globe, Plus, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

function WebsitesPage() {
  const [websites, setWebsites] = useState<WebsiteResponse[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newUrl, setNewUrl] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const fetchWebsites = async () => {
    setIsLoading(true)
    try {
      const data = await getUserData()
      if (data?.data?.websites) {
        setWebsites(data.data.websites)
      }
    } catch (error) {
      console.error("Failed to fetch websites:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWebsites()
  }, [])

  const handleAddWebsite = async () => {
    if (!newUrl) return
    setIsAdding(true)
    try {
      await addWebsite(newUrl)
      setNewUrl("")
      setIsDialogOpen(false)
      await fetchWebsites()
    } catch (error) {
      console.error("Failed to add website:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const getStatusColor = (status: "Up" | "Down" | "Unknown") => {
    switch (status) {
      case "Up":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "Down":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    }
  }

  const getTickColor = (status: "Up" | "Down" | "Unknown") => {
    switch (status) {
      case "Up":
        return "bg-emerald-500"
      case "Down":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 px-10 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Websites</h1>
          <p className="text-muted-foreground text-sm">
            Monitor and manage all your websites in one place
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchWebsites} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                Add Website
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Website</DialogTitle>
                <DialogDescription>
                  Enter the URL of the website you want to monitor. We&apos;ll start tracking its uptime immediately.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder="https://example.com"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddWebsite()}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddWebsite} disabled={isAdding || !newUrl}>
                  {isAdding ? "Adding..." : "Add Website"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : !websites || websites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-muted/50 rounded-xl">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No websites yet</h3>
              <p className="text-muted-foreground text-center max-w-sm mb-4">
                Start monitoring your first website. We&apos;ll track its uptime and alert you of any issues.
              </p>
              <Button onClick={() => setIsDialogOpen(true)} size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                Add Your First Website
              </Button>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-border/50">
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Website
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Uptime (Last 30 checks)
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {websites.map((website) => {
                    const currentStatus = website.ticks?.[0]?.status || "Unknown"
                    return (
                      <TableRow
                        key={website.id}
                        className="hover:bg-muted/80 transition-colors border-b border-border/30 last:border-0"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-border/50 flex items-center justify-center">
                              <Globe className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <Link
                                href={`/${website.id}`}
                                className="font-medium hover:underline flex items-center gap-1 group"
                              >
                                {website.url.replace("https://", "").replace("http://", "")}
                                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                              <p className="text-xs text-muted-foreground">{website.url}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(currentStatus)} border font-medium`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${getTickColor(currentStatus)} mr-1.5`} />
                            {currentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-0.5">
                            {website.ticks.slice(0, 30).reverse().map((tick, i) => (
                              <div
                                key={i}
                                className={`h-6 w-1.5 rounded-sm ${getTickColor(tick.status)} opacity-80 hover:opacity-100 transition-opacity`}
                                title={tick.status}
                              />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/${website.id}`}>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default WebsitesPage