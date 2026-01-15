"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"


export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signup } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      signup(formData)
      router.push("/dashboard")
    } catch (error) {
      alert("Error signing up: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px] z-10" />
        <div
          className="w-full h-full bg-cover bg-center animate-pulse-slow"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2570&auto=format&fit=crop')",
          }}
        />
      </div>

      <header className="px-6 h-16 flex items-center border-b border-border/40 backdrop-blur-md sticky top-0 z-50 bg-background/20 relative">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center text-primary-foreground shadow-lg">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          FastBoard
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Login
          </Link>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 py-12 relative z-10">
        <Card className="w-full max-w-md bg-background/60 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Sign up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
