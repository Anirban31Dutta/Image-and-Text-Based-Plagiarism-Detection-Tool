"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { WorkflowStepper, type WorkflowStep } from "@/components/workflow-stepper"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function ProcessingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: "upload",
      label: "File Upload",
      description: "Document uploaded successfully",
      status: "completed",
    },
    {
      id: "extraction",
      label: "Text & Image Extraction",
      description: "Extracting content from document",
      status: "active",
    },
    {
      id: "ocr",
      label: "OCR on Image Pages",
      description: "Applying optical character recognition",
      status: "pending",
    },
    {
      id: "nlp",
      label: "NLP Processing",
      description: "Processing text with natural language analysis",
      status: "pending",
    },
    {
      id: "detection",
      label: "Plagiarism Detection",
      description: "Analyzing content for similarity",
      status: "pending",
    },
  ])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    // Simulate workflow progression
    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((step) =>
            step.id === "extraction"
              ? { ...step, status: "completed" }
              : step.id === "ocr"
                ? { ...step, status: "active" }
                : step,
          ),
        )
      }, 2000),
    )

    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((step) =>
            step.id === "ocr"
              ? { ...step, status: "completed" }
              : step.id === "nlp"
                ? { ...step, status: "active" }
                : step,
          ),
        )
      }, 4000),
    )

    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((step) =>
            step.id === "nlp"
              ? { ...step, status: "completed" }
              : step.id === "detection"
                ? { ...step, status: "active" }
                : step,
          ),
        )
      }, 6000),
    )

    timers.push(
      setTimeout(() => {
        const fileId = searchParams?.get("file_id")
        if (fileId) {
          router.push(`/report?file_id=${encodeURIComponent(fileId)}`)
        } else {
          router.push("/report")
        }
      }, 8000),
    )

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
          <h2 className="mb-2 text-3xl font-bold text-foreground">Analyzing Your Document</h2>
          <p className="text-muted-foreground">Please wait while we process your submission</p>
        </div>

        <div className="grid gap-6">
          <WorkflowStepper steps={steps} />

          <Card className="bg-accent/10 border-accent/20 p-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Image-Based Content Detected</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our system has identified image-based content in your document. Optical Character Recognition (OCR) is
                being applied to extract text from images, ensuring comprehensive plagiarism detection across all
                content types.
              </p>
              <div className="rounded-md bg-primary/10 p-3">
                <p className="text-xs font-medium text-primary">
                  OCR Technology: Enables detection of plagiarism in scanned documents and image-based text
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
