import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-6 h-16 flex items-center border-b border-border/40 backdrop-blur-md sticky top-0 z-50 bg-background/80">
        <div className="font-bold text-2xl tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          FastBoard
        </div>
        <nav className="ml-auto flex gap-6 items-center">
          <ThemeToggle />
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Login
          </Link>
          <Link href="/signup">
            <Button size="sm" className="rounded-full px-6">Sign Up Free</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-10 text-center">
              <div className="space-y-6 max-w-4xl">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                  v2.0 Now Available
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                  Manage Tasks with <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                    Speed & Style
                  </span>
                </h1>
                <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl leading-relaxed">
                  The most intuitive task management platform for modern teams. Organize, track, and collaborate in real-time with an interface designed for focus.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105">Get Started for Free</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full backdrop-blur-sm hover:bg-muted/50 transition-all">Live Demo</Button>
                </Link>
              </div>

              <div className="w-full max-w-6xl mt-20 p-2 bg-muted/20 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/30 rounded-full blur-[80px]" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-[80px]" />
                <div className="w-full aspect-[16/9] bg-card rounded-xl border flex items-center justify-center text-muted-foreground overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-background flex flex-col items-center justify-center gap-4">
                    <div className="p-8 border rounded-xl bg-background/50 backdrop-blur-sm shadow-sm max-w-md w-full text-center">
                      <p className="font-semibold text-xl mb-2">Interactive Dashboard</p>
                      <p className="text-sm text-muted-foreground">Sign up to experience the full drag-and-drop power.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] opacity-50" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px] opacity-50" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
