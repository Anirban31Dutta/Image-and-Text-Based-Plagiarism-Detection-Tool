"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileText, ImageIcon, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface UploadCardProps {
  onFileSelect: (file: File) => void
  onAnalyze: () => void
}

export function UploadCard({ onFileSelect, onAnalyze }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        setSelectedFile(file)
        onFileSelect(file)
      }
    },
    [onFileSelect],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setSelectedFile(file)
        onFileSelect(file)
      }
    },
    [onFileSelect],
  )

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze()
    }
  }

  return (
    <Card
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed transition-all",
        isDragging ? "border-primary bg-primary/5" : "border-border",
        selectedFile && "border-success bg-success/5",
      )}
    >
      <div className="flex flex-col items-center justify-center p-12 text-center">
        {selectedFile ? (
          <>
            <CheckCircle2 className="mb-4 h-16 w-16 text-success" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">File Ready</h3>
            <p className="mb-6 text-sm text-muted-foreground">{selectedFile.name}</p>
            <Button onClick={handleAnalyze} size="lg" className="min-w-48">
              Analyze Plagiarism
            </Button>
          </>
        ) : (
          <>
            <Upload className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">Upload Your Document</h3>
            <p className="mb-6 text-sm text-muted-foreground">Drag and drop your file here, or click to browse</p>

            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.docx,.jpg,.jpeg,.png"
              onChange={handleFileInput}
            />
            <label htmlFor="file-upload">
              <Button size="lg" className="min-w-48" asChild>
                <span>Select File</span>
              </Button>
            </label>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>PDF, DOCX</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ImageIcon className="h-4 w-4" />
                <span>JPG, PNG</span>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
