"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText } from "lucide-react"
import { clearToken, getToken } from "@/lib/auth"
import { useMemo } from "react"

export function Navigation() {
  const pathname = usePathname()
  const hasToken = useMemo(() => (typeof window !== "undefined" ? Boolean(getToken()) : false), [pathname])

  const links = [
    { href: "/", label: "Upload" },
    { href: "/report", label: "Report" },
    { href: "/history", label: "History" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight text-foreground">Plagiarism Detector</h1>
              <p className="text-xs text-muted-foreground">Image & Text Analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === link.href
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            {hasToken ? (
              <button
                onClick={clearToken}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === "/login"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
