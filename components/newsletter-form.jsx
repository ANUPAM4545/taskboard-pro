"use client"

import { useState } from "react"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToNewsletter } from "@/actions/newsletter"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null) // 'success', 'error', or null

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setMessage("Please enter your email address")
      setStatus("error")
      return
    }

    setIsLoading(true)
    setMessage(null)
    setStatus(null)

    try {
      const result = await subscribeToNewsletter(email)

      if (result.success) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }

      setMessage(result.message)
    } catch (error) {
      setStatus("error")
      setMessage("An unexpected error occurred. Please try again.")
      console.error("Newsletter subscription error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-l-md border border-r-0 bg-background px-3 py-2 text-sm"
            disabled={isLoading || status === "success"}
            aria-label="Email for newsletter"
          />
          <Button
            type="submit"
            className="rounded-r-md px-3 py-2 text-sm font-medium"
            disabled={isLoading || status === "success"}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>

        {message && (
          <div
            className={`text-sm flex items-center ${
              status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            {status === "success" ? (
              <CheckCircle className="h-4 w-4 mr-1 inline" />
            ) : (
              <AlertCircle className="h-4 w-4 mr-1 inline" />
            )}
            {message}
          </div>
        )}
      </form>
    </div>
  )
}
