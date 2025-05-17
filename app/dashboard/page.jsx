"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import DashboardHeader from "@/components/dashboard-header"
import TaskBoard from "@/components/task-board"
import { SiteFooter } from "@/components/site-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="mb-6 text-2xl font-bold">Welcome, {user.name}</h1>

          <Tabs defaultValue="board" value={activeView} onValueChange={setActiveView} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="board" className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                <span>Board View</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Calendar View</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="board" className="mt-4">
              <TaskBoard viewMode="board" />
            </TabsContent>

            <TabsContent value="calendar" className="mt-4">
              <TaskBoard viewMode="calendar" />
            </TabsContent>

            <TabsContent value="calendar" className="mt-4">
              <TaskBoard viewMode="calendar" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
