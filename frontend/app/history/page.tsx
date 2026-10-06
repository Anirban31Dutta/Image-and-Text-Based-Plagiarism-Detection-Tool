"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getToken } from "@/lib/auth"

type HistoryItem = {
  id: number
  file_name: string
  plagiarism_percentage: number
  ai_percentage: number
  created_at: string
}

export default function HistoryPage() {
  const router = useRouter()
  const [reports, setReports] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push("/login")
      return
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    const fetchReports = async () => {
      try {
        const res = await fetch(`${API_URL}/reports`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
          throw new Error(`Failed to load reports: ${res.status}`)
        }
        const data: HistoryItem[] = await res.json()
        setReports(data)
      } catch (err: any) {
        setError(err?.message || String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [router])

  const handleDownload = async (reportId: number, type: "normal" | "ai") => {
    const token = getToken()
    if (!token) {
      router.push("/login")
      return
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
    const res = await fetch(`${API_URL}/download/${reportId}?type=${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      setError(`Download failed: ${res.status}`)
      return
    }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
    setTimeout(() => URL.revokeObjectURL(url), 15000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-foreground">Report History</h2>
          <p className="text-muted-foreground">View previous plagiarism reports and download PDFs.</p>
        </div>

        <Card className="p-6">
          {loading && <p className="text-sm text-muted-foreground">Loading reports...</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-3">File Name</th>
                    <th className="py-3">Plagiarism %</th>
                    <th className="py-3">AI %</th>
                    <th className="py-3">Date</th>
                    <th className="py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b border-border/50">
                      <td className="py-3">{report.file_name}</td>
                      <td className="py-3">{report.plagiarism_percentage.toFixed(2)}%</td>
                      <td className="py-3">{report.ai_percentage.toFixed(2)}%</td>
                      <td className="py-3">{new Date(report.created_at).toLocaleString()}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleDownload(report.id, "normal")}>
                            Normal
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownload(report.id, "ai")}>
                            AI
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {reports.length === 0 && <p className="py-6 text-sm text-muted-foreground">No reports found.</p>}
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
