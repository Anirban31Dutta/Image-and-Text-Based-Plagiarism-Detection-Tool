"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface SentenceAnalysisControlsProps {
  threshold: number
  onThresholdChange: (value: number) => void
  showPlagiarizedOnly: boolean
  onShowPlagiarizedOnlyChange: (value: boolean) => void
}

export function SentenceAnalysisControls({
  threshold,
  onThresholdChange,
  showPlagiarizedOnly,
  onShowPlagiarizedOnlyChange,
}: SentenceAnalysisControlsProps) {
  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Analysis Controls</h3>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="threshold" className="text-sm font-medium">
              Similarity Threshold
            </Label>
            <span className="text-sm font-medium text-primary">{threshold}%</span>
          </div>
          <Slider
            id="threshold"
            min={0}
            max={100}
            step={5}
            value={[threshold]}
            onValueChange={([value]) => onThresholdChange(value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Sentences above this threshold will be flagged as plagiarized</p>
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <Label htmlFor="show-plagiarized" className="text-sm font-medium">
              Show Plagiarized Only
            </Label>
            <p className="text-xs text-muted-foreground">Hide original sentences from view</p>
          </div>
          <Switch id="show-plagiarized" checked={showPlagiarizedOnly} onCheckedChange={onShowPlagiarizedOnlyChange} />
        </div>
      </div>
    </Card>
  )
}
