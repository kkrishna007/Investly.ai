"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, Globe, Database, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface TAMAnalysis {
  claimedTAM: string
  realisticTAM: string
  confidence: "High" | "Medium" | "Low"
  discrepancy: number
  sources: Array<{
    name: string
    value: string
    url: string
    credibility: "High" | "Medium" | "Low"
  }>
  redFlags: string[]
  marketSegments: Array<{
    segment: string
    size: string
    growth: string
  }>
}

const mockTAMData: TAMAnalysis = {
  claimedTAM: "$100B",
  realisticTAM: "$12.4B",
  confidence: "High",
  discrepancy: 87.6,
  sources: [
    { name: "Gartner Research", value: "$11.8B", url: "#", credibility: "High" },
    { name: "Statista", value: "$13.2B", url: "#", credibility: "High" },
    { name: "McKinsey Report", value: "$12.1B", url: "#", credibility: "High" },
    { name: "IDC Analysis", value: "$12.9B", url: "#", credibility: "Medium" },
  ],
  redFlags: [
    "Claimed TAM is 8x higher than industry estimates",
    "No segmentation provided for market calculation",
    "Includes adjacent markets not directly addressable",
  ],
  marketSegments: [
    { segment: "Core SaaS Market", size: "$8.2B", growth: "12% CAGR" },
    { segment: "Enterprise Segment", size: "$3.1B", growth: "15% CAGR" },
    { segment: "SMB Segment", size: "$1.1B", growth: "8% CAGR" },
  ],
}

export function TAMRealityCheck() {
  const [isExpanded, setIsExpanded] = useState(false)
  const data = mockTAMData

  const getDiscrepancyColor = (discrepancy: number) => {
    if (discrepancy > 50) return "text-red-400"
    if (discrepancy > 25) return "text-yellow-400"
    return "text-green-400"
  }

  const getDiscrepancyIcon = (discrepancy: number) => {
    if (discrepancy > 50) return XCircle
    if (discrepancy > 25) return AlertTriangle
    return CheckCircle
  }

  const DiscrepancyIcon = getDiscrepancyIcon(data.discrepancy)

  return (
    <Card className="glass glow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>TAM Reality Check</span>
          </div>
          <Badge variant="outline" className={`${getDiscrepancyColor(data.discrepancy)} border-current`}>
            {data.discrepancy}% Discrepancy
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Founder Claim</p>
                <p className="text-2xl font-bold text-red-400">{data.claimedTAM}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Realistic Estimate</p>
                <p className="text-2xl font-bold text-green-400">{data.realisticTAM}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Confidence Level</span>
                <Badge variant="outline" className="text-green-400 border-green-400/50">
                  {data.confidence}
                </Badge>
              </div>
              <Progress
                value={data.confidence === "High" ? 90 : data.confidence === "Medium" ? 60 : 30}
                className="h-2"
              />
            </div>

            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <DiscrepancyIcon className={`h-5 w-5 ${getDiscrepancyColor(data.discrepancy)}`} />
                <span className="text-sm font-medium">Reality Gap</span>
              </div>
              <p className={`text-lg font-bold ${getDiscrepancyColor(data.discrepancy)}`}>
                {data.discrepancy}% Overestimation
              </p>
            </div>
          </div>
        </div>

        {/* Red Flags */}
        {data.redFlags.length > 0 && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="font-medium text-red-400">Red Flags Detected</span>
            </div>
            <ul className="space-y-2">
              {data.redFlags.map((flag, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Market Sources */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium flex items-center space-x-2">
              <Database className="h-4 w-4 text-primary" />
              <span>Verified Sources</span>
            </h4>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Show Less" : "Show More"}
            </Button>
          </div>

          <div className="grid gap-3">
            {data.sources.slice(0, isExpanded ? data.sources.length : 2).map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">{source.name}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        source.credibility === "High"
                          ? "text-green-400 border-green-400/50"
                          : "text-yellow-400 border-yellow-400/50"
                      }`}
                    >
                      {source.credibility}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Market Size: {source.value}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Market Segmentation */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h4 className="font-medium mb-4 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Market Segmentation</span>
            </h4>
            <div className="grid gap-3">
              {data.marketSegments.map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{segment.segment}</p>
                    <p className="text-xs text-muted-foreground">Growth: {segment.growth}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{segment.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-border/50">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            Request Market Research
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            Flag for Review
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
