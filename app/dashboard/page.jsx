"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import DashboardHeader from "@/components/dashboard-header"
import TaskBoard from "@/components/task-board"
import { SiteFooter } from "@/components/site-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Calendar, LayoutGrid } from "lucide-react"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeView, setActiveView] = useState("board")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 mesh-gradient opacity-40 dark:opacity-60" />
      <div className="fixed inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

      <DashboardHeader />

      <main className="flex-1 p-6 md:p-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[1500px]"
        >
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                Active Workspace
              </h1>
              <p className="text-muted-foreground text-lg font-medium">
                Orchestrate your flow. Track, manage, and deliver.
              </p>
            </div>

            <Tabs defaultValue="board" value={activeView} onValueChange={setActiveView} className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="p-1 h-11 bg-muted/50 backdrop-blur-sm border rounded-xl">
                  <TabsTrigger value="board" className="rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    <span>Board</span>
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Calendar</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TaskBoard viewMode={activeView} />
            </Tabs>
          </div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
