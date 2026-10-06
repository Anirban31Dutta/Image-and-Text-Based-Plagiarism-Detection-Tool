"use client"

import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface WorkflowStep {
  id: string
  label: string
  description: string
  status: "pending" | "active" | "completed"
}

interface WorkflowStepperProps {
  steps: WorkflowStep[]
}

export function WorkflowStepper({ steps }: WorkflowStepperProps) {
  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Analysis Workflow</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  step.status === "completed" && "bg-success",
                  step.status === "active" && "bg-primary",
                  step.status === "pending" && "bg-muted",
                )}
              >
                {step.status === "completed" && <CheckCircle2 className="h-5 w-5 text-success-foreground" />}
                {step.status === "active" && <Loader2 className="h-5 w-5 animate-spin text-primary-foreground" />}
                {step.status === "pending" && <Circle className="h-5 w-5 text-muted-foreground" />}
              </div>
              {index < steps.length - 1 && (
                <div className={cn("h-12 w-0.5", step.status === "completed" ? "bg-success" : "bg-border")} />
              )}
            </div>
            <div className="flex-1 pb-4">
              <h4
                className={cn(
                  "font-medium",
                  step.status === "pending" && "text-muted-foreground",
                  step.status === "active" && "text-primary",
                  step.status === "completed" && "text-foreground",
                )}
              >
                {step.label}
              </h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
