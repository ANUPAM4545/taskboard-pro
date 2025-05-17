"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b bg-background">
      <div className="flex h-14 items-center px-4">
        <Link className="font-bold text-xl" href="/dashboard">
          Fast TaskBoard
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm">{user?.name || "User"}</span>
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
