"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { setToken } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<"login" | "register">("login")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
    const endpoint = mode === "login" ? "/auth/login" : "/auth/register"

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.detail || "Authentication failed")
      }

      setToken(data.access_token)
      router.push("/")
    } catch (err: any) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-md px-4 py-16">
        <Card className="p-6">
          <h2 className="mb-2 text-2xl font-bold text-foreground">{mode === "login" ? "Login" : "Register"}</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            {mode === "login" ? "Sign in to run plagiarism checks." : "Create an account to save report history."}
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
            </Button>
          </form>

          <Button
            variant="ghost"
            className="mt-4 w-full"
            onClick={() => setMode((current) => (current === "login" ? "register" : "login"))}
          >
            {mode === "login" ? "Need an account? Register" : "Already have an account? Login"}
          </Button>
        </Card>
      </main>
    </div>
  )
}
