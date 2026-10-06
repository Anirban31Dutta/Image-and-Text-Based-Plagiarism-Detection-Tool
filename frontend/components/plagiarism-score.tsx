import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PlagiarismScoreProps {
  percentage: number
}

export function PlagiarismScore({ percentage }: PlagiarismScoreProps) {
  const getColor = (score: number) => {
    if (score < 20) return "success"
    if (score < 50) return "warning"
    return "danger"
  }

  const color = getColor(percentage)

  const colorClasses = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
  }

  const bgClasses = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
  }

  return (
    <Card className="p-8">
      <div className="text-center">
        <p className="mb-4 text-sm font-medium text-muted-foreground">Overall Plagiarism Score</p>
        <div className="relative mx-auto mb-6 h-40 w-40">
          <svg className="h-full w-full -rotate-90 transform">
            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="none" className="text-muted" />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${(percentage / 100) * 439.6} 439.6`}
              className={cn(colorClasses[color], "transition-all duration-1000")}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <p className={cn("text-5xl font-bold", colorClasses[color])}>{percentage}%</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">
            {percentage < 20 ? "Low Risk" : percentage < 50 ? "Moderate Risk" : "High Risk"}
          </p>
          <p className="text-sm text-muted-foreground">
            {percentage < 20
              ? "Document appears to be mostly original"
              : percentage < 50
                ? "Some content may need citation review"
                : "Significant plagiarism detected"}
          </p>
        </div>
      </div>
    </Card>
  )
}
