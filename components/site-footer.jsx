import Link from "next/link"
import { Github, Twitter, Mail, Heart } from "lucide-react"
import { NewsletterForm } from "@/components/newsletter-form"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6 py-12 max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground">
                <div className="w-3 h-3 bg-white rounded-sm" />
              </div>
              FastBoard
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Elevate your productivity with a task management experience designed for modern teams. Simple, fast, and beautiful.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Ecosystem</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Workspace
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Team Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Community</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/ANUPAM4545/taskboard-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="mailto:contact@anupam.dev"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Updates</h3>
            <p className="text-xs text-muted-foreground">Stay tuned for the latest features and release notes.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} FastBoard. Built for speed.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <p className="flex items-center text-muted-foreground">
              Crafted with <Heart className="mx-1.5 h-3.5 w-3.5 text-red-500 fill-red-500" /> by ANUPAM
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
