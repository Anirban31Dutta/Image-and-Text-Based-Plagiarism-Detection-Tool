import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SummaryCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  variant?: "default" | "success" | "warning" | "danger"
}

export function SummaryCard({ title, value, subtitle, icon: Icon, variant = "default" }: SummaryCardProps) {
  const variants = {
    default: "bg-card border-border",
    success: "bg-success/10 border-success/30",
    warning: "bg-warning/10 border-warning/30",
    danger: "bg-destructive/10 border-destructive/30",
  }

  const iconVariants = {
    default: "text-muted-foreground",
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
  }

  return (
    <Card className={cn("p-6", variants[variant])}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={cn("rounded-lg p-3", iconVariants[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  )
}
