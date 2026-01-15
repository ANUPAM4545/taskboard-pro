"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

import { motion } from "framer-motion"

export default function DashboardHeader() {
  const { user, logout } = useAuth()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="border-b bg-background/60 backdrop-blur-xl sticky top-0 z-50 border-white/5"
    >
      <div className="flex h-16 items-center px-6 max-w-[1500px] mx-auto">
        <Link className="font-extrabold text-2xl tracking-tighter flex items-center gap-3 active:scale-95 transition-transform" href="/dashboard">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="w-5 h-5 bg-white/20 backdrop-blur-sm rounded-[4px] border border-white/40" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            FastBoard
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-8">
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            <span className="text-xs font-bold tracking-tight text-foreground/80">{user?.name || "User"}</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all font-bold text-xs uppercase tracking-widest px-4"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
