"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { SummaryCard } from "@/components/summary-card"
import { PlagiarismScore } from "@/components/plagiarism-score"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle2, Download, RotateCcw, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { getToken } from "@/lib/auth"

type SentenceAnalysis = {
  sentence: string
  similarity_score: number
  is_plagiarized: boolean
  ai_likelihood?: number
}

type Report = {
  report_id?: number
  file_id: string
  plagiarism_percentage: number
  ai_percentage: number
  analysis: SentenceAnalysis[]
}

export default function ReportPage() {
  const router = useRouter()
  const [showAllSentences, setShowAllSentences] = useState(false)
  const searchParams = useSearchParams()

  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fileId = searchParams?.get("file_id")

  useEffect(() => {
    if (!fileId) return

    const fetchReport = async () => {
      setLoading(true)
      setError(null)
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const token = getToken()
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const res = await fetch(`${API_URL}/plagiarism/${encodeURIComponent(fileId)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error(`Failed to fetch report: ${res.status}`)

        const data: Report = await res.json()
        setReport(data)

      } catch (err: any) {
        setError(err?.message || String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [fileId, router])

  const sentencesWithThreshold = (report?.analysis || []).map((s, idx) => ({
    id: idx + 1,
    text: s.sentence,
    similarityScore: Math.round(s.similarity_score * 100),
    isPlagiarized: s.is_plagiarized,
  }))

  const filteredSentences = sentencesWithThreshold

  const displayedSentences = showAllSentences ? filteredSentences : filteredSentences.slice(0, 3)

  const plagiarizedCount = sentencesWithThreshold.filter((s) => s.isPlagiarized).length
  const downloadReport = async (type: "normal" | "ai") => {
    if (!report || !report.report_id) return
    const token = getToken()
    if (!token) {
      router.push("/login")
      return
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
    const res = await fetch(`${API_URL}/download/${report.report_id}?type=${type}`, {
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">Plagiarism Analysis Report</h2>
            <p className="text-muted-foreground">Complete analysis of your document</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push("/")}>
              <RotateCcw className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
            <Button onClick={() => downloadReport("normal")} disabled={!report}>
              <Download className="mr-2 h-4 w-4" />
              Download Normal Report
            </Button>
            <Button variant="outline" onClick={() => downloadReport("ai")} disabled={!report}>
              <Download className="mr-2 h-4 w-4" />
              Download AI Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <PlagiarismScore percentage={report ? report.plagiarism_percentage : 0} />

            <div className="grid gap-4 sm:grid-cols-3">
              <SummaryCard
                title="Total Sentences"
                value={report ? (report.analysis || []).length : "-"}
                subtitle="Analyzed"
                icon={FileText}
              />
              <SummaryCard
                title="Plagiarized"
                value={plagiarizedCount}
                subtitle={`${(report ? (report.analysis || []).length : 0) - plagiarizedCount} original`}
                icon={FileText}
                variant="warning"
              />
              <SummaryCard
                title="AI Plagiarism"
                value={`${report ? report.ai_percentage.toFixed(2) : "0.00"}%`}
                subtitle="AI-generated likelihood"
                icon={CheckCircle2}
                variant="default"
              />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-foreground">Analysis Details</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Document Type</p>
                  <p className="font-medium text-foreground">PDF with Images</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Processing Time</p>
                  <p className="font-medium text-foreground">8.3 seconds</p>
                </div>
                <div>
                  <p className="text-muted-foreground">OCR Confidence</p>
                  <p className="font-medium text-foreground">94.2%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Analysis Date</p>
                  <p className="font-medium text-foreground">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Sentence-Level Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  {filteredSentences.length} sentence{filteredSentences.length !== 1 ? "s" : ""} shown
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {displayedSentences.map((sentence) => (
                <Card
                  key={sentence.id}
                  className={cn(
                    "p-4 transition-all",
                    sentence.isPlagiarized
                      ? "border-destructive/30 bg-destructive/5"
                      : "border-success/30 bg-success/5",
                  )}
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <p className="flex-1 text-sm leading-relaxed text-foreground">{sentence.text}</p>
                    <Badge variant={sentence.isPlagiarized ? "destructive" : "default"} className="shrink-0">
                      {sentence.isPlagiarized ? "Plagiarized" : "Original"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Similarity Score</span>
                        <span className="font-medium text-foreground">{sentence.similarityScore}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full transition-all",
                            sentence.isPlagiarized ? "bg-destructive" : "bg-success",
                          )}
                          style={{ width: `${sentence.similarityScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredSentences.length > 3 && (
              <div className="mt-6 text-center">
                <Button variant="outline" onClick={() => setShowAllSentences(!showAllSentences)}>
                  {showAllSentences ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Show All {filteredSentences.length} Sentences
                    </>
                  )}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
