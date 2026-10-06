"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { UploadCard } from "@/components/upload-card"
import { WorkflowStepper, type WorkflowStep } from "@/components/workflow-stepper"
import { getToken } from "@/lib/auth"

const initialSteps: WorkflowStep[] = [
  {
    id: "upload",
    label: "File Upload",
    description: "Upload your document for analysis",
    status: "pending",
  },
  {
    id: "extraction",
    label: "Text & Image Extraction",
    description: "Extract content from document",
    status: "pending",
  },
  {
    id: "ocr",
    label: "OCR on Image Pages",
    description: "Apply optical character recognition",
    status: "pending",
  },
  {
    id: "nlp",
    label: "NLP Processing",
    description: "Process text with natural language processing",
    status: "pending",
  },
  {
    id: "detection",
    label: "Plagiarism Detection",
    description: "Analyze content for similarity",
    status: "pending",
  },
]

export default function UploadPage() {
  const router = useRouter()
  const [steps, setSteps] = useState<WorkflowStep[]>(initialSteps)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    // Update first step to completed
    setSteps((prev) => prev.map((step, index) => (index === 0 ? { ...step, status: "completed" } : step)))
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    const token = getToken()
    if (!token) {
      router.push("/login")
      return
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const res = await fetch(`${API_URL}/upload/`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.status}`)
      }

      const data = await res.json()
      const fileId = data.file_id

      // After upload, run ingest -> ocr -> nlp -> plagiarism in sequence.
      // Each step must run or plagiarism will 404.
      console.log("About to ingest file_id:", fileId)
      const ingestRes = await fetch(`${API_URL}/ingest/${fileId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!ingestRes.ok) throw new Error(`Ingest failed: ${ingestRes.status}`)

      console.log("Calling OCR")
      const ocrRes = await fetch(`${API_URL}/ocr/${fileId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!ocrRes.ok) throw new Error(`OCR failed: ${ocrRes.status}`)

      console.log("Calling NLP")
      const nlpRes = await fetch(`${API_URL}/nlp/${fileId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!nlpRes.ok) throw new Error(`NLP failed: ${nlpRes.status}`)

      console.log("Calling plagiarism")
      const reportRes = await fetch(`${API_URL}/plagiarism/${fileId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!reportRes.ok) throw new Error(`Plagiarism failed: ${reportRes.status}`)
      const report = await reportRes.json()

      // navigate to processing/report page with file id
      router.push(`/processing?file_id=${encodeURIComponent(fileId)}`)
    } catch (err) {
      console.error("Upload error", err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-4xl font-bold text-foreground text-balance">Academic Plagiarism Detection</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Advanced OCR-powered plagiarism detection for image-based and text documents
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UploadCard onFileSelect={handleFileSelect} onAnalyze={handleAnalyze} />

            <div className="mt-8 rounded-lg bg-accent/10 border border-accent/20 p-6">
              <h3 className="mb-2 font-semibold text-foreground">Supported File Types</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Upload PDF or DOCX documents for traditional text analysis, or JPG/PNG images for OCR-based plagiarism
                detection. Our system automatically detects image-based content and applies optical character
                recognition to ensure comprehensive analysis.
              </p>
            </div>
          </div>

          <div>
            <WorkflowStepper steps={steps} />
          </div>
        </div>
      </main>
    </div>
  )
}
