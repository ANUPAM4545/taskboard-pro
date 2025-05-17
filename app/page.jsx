import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 h-14 flex items-center border-b">
        <span className="font-bold text-xl">Fast TaskBoard</span>
        <nav className="ml-auto flex gap-4 items-center">
          <ThemeToggle />
          <Link href="/login" className="text-sm font-medium hover:underline">
            Login
          </Link>
          <Link href="/signup" className="text-sm font-medium hover:underline">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple Task Management</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Organize your tasks quickly and efficiently.
              </p>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
