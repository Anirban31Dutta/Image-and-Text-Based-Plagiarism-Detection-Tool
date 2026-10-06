"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { FileText, Search, Brain, Zap, Target, Shield } from "lucide-react"

export default function AboutPage() {
  const technologies = [
    { name: "FastAPI", category: "Backend Framework" },
    { name: "OCR Engine", category: "Image Processing" },
    { name: "NLP", category: "Text Analysis" },
    { name: "TF-IDF", category: "Text Similarity" },
    { name: "Semantic Embeddings", category: "Deep Learning" },
    { name: "Transformer Models", category: "Language Models" },
  ]

  const features = [
    {
      icon: FileText,
      title: "Document Processing",
      description: "Support for PDF, DOCX, and image files with automatic format detection and content extraction.",
    },
    {
      icon: Search,
      title: "OCR Technology",
      description:
        "Advanced optical character recognition to detect plagiarism in scanned documents and image-based text.",
    },
    {
      icon: Brain,
      title: "NLP Analysis",
      description: "Natural language processing techniques to understand context and semantic meaning in text.",
    },
    {
      icon: Zap,
      title: "Hybrid Detection",
      description: "Combines TF-IDF statistical methods with semantic embeddings for accurate plagiarism detection.",
    },
    {
      icon: Target,
      title: "Sentence-Level Precision",
      description: "Identifies specific sentences with plagiarism, providing detailed similarity scores for each.",
    },
    {
      icon: Shield,
      title: "Academic Integrity",
      description: "Built specifically for academic use with methodologies aligned to educational standards.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="mb-4 text-4xl font-bold text-foreground text-balance">About the Project</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            A Final Year Engineering Major Project focused on addressing the critical gap in plagiarism detection tools
            by introducing OCR-based analysis for image content.
          </p>
        </div>

        <div className="mb-12">
          <Card className="bg-primary/5 border-primary/20 p-8">
            <h3 className="mb-4 text-2xl font-semibold text-foreground">The Problem</h3>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Traditional plagiarism detection tools focus exclusively on text-based content, leaving a significant
              vulnerability in academic integrity systems. Students and researchers can bypass detection by converting
              plagiarized text into images, embedding screenshots in documents, or submitting scanned copies of
              plagiarized work.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This creates an unfair advantage for those willing to exploit this limitation and undermines the
              effectiveness of existing plagiarism detection systems in maintaining academic standards.
            </p>
          </Card>
        </div>

        <div className="mb-12">
          <Card className="bg-success/5 border-success/20 p-8">
            <h3 className="mb-4 text-2xl font-semibold text-foreground">Our Solution</h3>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              This project introduces a hybrid plagiarism detection system that combines traditional text analysis with
              advanced Optical Character Recognition (OCR) technology. By automatically detecting and processing
              image-based content, the system provides comprehensive plagiarism detection across all content types.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The system employs a multi-stage pipeline that extracts text from both traditional document formats and
              images, applies NLP processing for semantic understanding, and uses both statistical (TF-IDF) and
              deep-learning-based (semantic embeddings) approaches to identify plagiarism at the sentence level.
            </p>
          </Card>
        </div>

        <div className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">Key Features</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2 font-semibold text-foreground">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">Methodology</h3>
          <Card className="p-8">
            <div className="space-y-8">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    1
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Document Upload & Preprocessing</h4>
                </div>
                <p className="ml-11 text-sm text-muted-foreground leading-relaxed">
                  The system accepts multiple document formats (PDF, DOCX, images) and performs initial preprocessing to
                  identify content types and prepare for extraction.
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    2
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Text & Image Extraction</h4>
                </div>
                <p className="ml-11 text-sm text-muted-foreground leading-relaxed">
                  Text is extracted from document formats using standard parsers, while images are identified and
                  prepared for OCR processing.
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    3
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">OCR Application</h4>
                </div>
                <p className="ml-11 text-sm text-muted-foreground leading-relaxed">
                  Advanced OCR technology extracts text from images with high accuracy, converting visual content into
                  machine-readable text for analysis.
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    4
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">NLP Processing</h4>
                </div>
                <p className="ml-11 text-sm text-muted-foreground leading-relaxed">
                  Natural language processing techniques analyze the extracted text, performing tokenization, sentence
                  segmentation, and semantic analysis to prepare for similarity detection.
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    5
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Hybrid Similarity Detection</h4>
                </div>
                <p className="ml-11 text-sm text-muted-foreground leading-relaxed">
                  The system employs both TF-IDF for statistical similarity and semantic embeddings for contextual
                  understanding, combining these approaches to accurately identify plagiarism at the sentence level with
                  confidence scores.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">Technologies Used</h3>
          <Card className="p-8">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-4"
                >
                  <div>
                    <p className="font-semibold text-foreground">{tech.name}</p>
                    <p className="text-xs text-muted-foreground">{tech.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card className="bg-accent/10 border-accent/20 p-8">
            <h3 className="mb-4 text-2xl font-semibold text-foreground">Architecture Overview</h3>
            <div className="rounded-lg bg-muted p-8">
              <div className="space-y-4 text-center">
                <div className="mx-auto max-w-2xl space-y-3">
                  <div className="rounded-lg bg-card border-2 border-border p-4">
                    <p className="font-semibold text-foreground">Frontend Interface</p>
                    <p className="text-xs text-muted-foreground">React / Next.js Application</p>
                  </div>
                  <div className="text-muted-foreground">↓</div>
                  <div className="rounded-lg bg-card border-2 border-primary p-4">
                    <p className="font-semibold text-foreground">FastAPI Backend</p>
                    <p className="text-xs text-muted-foreground">REST API Endpoints</p>
                  </div>
                  <div className="text-muted-foreground">↓</div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg bg-card border-2 border-border p-3">
                      <p className="text-sm font-semibold text-foreground">OCR Engine</p>
                    </div>
                    <div className="rounded-lg bg-card border-2 border-border p-3">
                      <p className="text-sm font-semibold text-foreground">NLP Module</p>
                    </div>
                    <div className="rounded-lg bg-card border-2 border-border p-3">
                      <p className="text-sm font-semibold text-foreground">Similarity Detection</p>
                    </div>
                  </div>
                  <div className="text-muted-foreground">↓</div>
                  <div className="rounded-lg bg-success/10 border-2 border-success p-4">
                    <p className="font-semibold text-foreground">Plagiarism Report</p>
                    <p className="text-xs text-muted-foreground">Sentence-level Analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
