"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, XCircle, FileText, Eye, ExternalLink, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ConsistencyIssue {
  id: string
  metric: string
  severity: "Critical" | "High" | "Medium" | "Low"
  discrepancy: string
  sources: Array<{
    document: string
    value: string
    location: string
  }>
  impact: string
  recommendation: string
}

interface ConsistencyReport {
  overallScore: number
  totalIssues: number
  criticalIssues: number
  documentsAnalyzed: number
  issues: ConsistencyIssue[]
}

const mockConsistencyData: ConsistencyReport = {
  overallScore: 72,
  totalIssues: 8,
  criticalIssues: 2,
  documentsAnalyzed: 5,
  issues: [
    {
      id: "1",
      metric: "Annual Recurring Revenue (ARR)",
      severity: "Critical",
      discrepancy: "$2.4M vs $2.8M vs $2.1M",
      sources: [
        { document: "Pitch Deck", value: "$2.4M", location: "Slide 8" },
        { document: "Financial Model", value: "$2.8M", location: "Revenue Tab" },
        { document: "Email Update", value: "$2.1M", location: "Q4 Update" },
      ],
      impact: "16% variance in key revenue metric creates uncertainty about actual performance",
      recommendation: "Request clarification and latest audited financials",
    },
    {
      id: "2",
      metric: "Customer Count",
      severity: "High",
      discrepancy: "150+ vs 142 vs 165",
      sources: [
        { document: "Pitch Deck", value: "150+", location: "Slide 12" },
        { document: "CRM Export", value: "142", location: "Customer List" },
        { document: "Call Transcript", value: "165", location: "Founder Interview" },
      ],
      impact: "Customer count inconsistency affects unit economics calculations",
      recommendation: "Verify with current CRM data and define customer criteria",
    },
    {
      id: "3",
      metric: "Team Size",
      severity: "Medium",
      discrepancy: "45 vs 52 vs 48",
      sources: [
        { document: "Pitch Deck", value: "45", location: "Team Slide" },
        { document: "LinkedIn", value: "52", location: "Company Page" },
        { document: "Call Transcript", value: "48", location: "HR Discussion" },
      ],
      impact: "Minor variance in headcount, may reflect recent hires or contractors",
      recommendation: "Clarify FTE vs contractor distinction",
    },
    {
      id: "4",
      metric: "Burn Rate",
      severity: "Critical",
      discrepancy: "$180K vs $220K monthly",
      sources: [
        { document: "Financial Model", value: "$180K", location: "Cash Flow" },
        { document: "Board Deck", value: "$220K", location: "Financial Summary" },
      ],
      impact: "22% difference in burn rate significantly affects runway calculations",
      recommendation: "Request detailed expense breakdown and cash flow statement",
    },
    {
      id: "5",
      metric: "Gross Margin",
      severity: "Medium",
      discrepancy: "85% vs 82% vs 87%",
      sources: [
        { document: "Pitch Deck", value: "85%", location: "Unit Economics" },
        { document: "Financial Model", value: "82%", location: "P&L" },
        { document: "Call Transcript", value: "87%", location: "Metrics Discussion" },
      ],
      impact: "Margin variance affects profitability projections",
      recommendation: "Verify calculation methodology and cost allocation",
    },
  ],
}

export function ConsistencyChecker() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
  const data = mockConsistencyData

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "text-red-400 border-red-400/50 bg-red-400/10"
      case "High":
        return "text-orange-400 border-orange-400/50 bg-orange-400/10"
      case "Medium":
        return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10"
      case "Low":
        return "text-blue-400 border-blue-400/50 bg-blue-400/10"
      default:
        return "text-muted-foreground border-border/50"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
        return XCircle
      case "High":
        return AlertTriangle
      case "Medium":
        return AlertTriangle
      case "Low":
        return CheckCircle
      default:
        return AlertTriangle
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const filteredIssues =
    selectedSeverity === "all" ? data.issues : data.issues.filter((issue) => issue.severity === selectedSeverity)

  return (
    <Card className="glass glow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Cross-Document Consistency Analysis</span>
          </div>
          <Badge variant="outline" className={`${getScoreColor(data.overallScore)} border-current`}>
            {data.overallScore}% Consistent
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className={`text-2xl font-bold ${getScoreColor(data.overallScore)}`}>{data.overallScore}%</div>
                <div className="text-xs text-muted-foreground">Consistency Score</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">{data.documentsAnalyzed}</div>
                <div className="text-xs text-muted-foreground">Documents Analyzed</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">{data.totalIssues}</div>
                <div className="text-xs text-muted-foreground">Total Issues</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-red-400">{data.criticalIssues}</div>
                <div className="text-xs text-muted-foreground">Critical Issues</div>
              </div>
            </div>

            {/* Issue Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Issue Breakdown by Severity</h3>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="text-sm bg-background border border-border/50 rounded px-2 py-1"
                  >
                    <option value="all">All Severities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {filteredIssues.slice(0, 3).map((issue, index) => {
                  const SeverityIcon = getSeverityIcon(issue.severity)
                  return (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-muted/20 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <SeverityIcon className={`h-5 w-5 ${getSeverityColor(issue.severity).split(" ")[0]}`} />
                          <div>
                            <h4 className="font-medium">{issue.metric}</h4>
                            <p className="text-sm text-muted-foreground">{issue.discrepancy}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                      </div>

                      <div className="text-sm text-muted-foreground mb-3">
                        <strong>Impact:</strong> {issue.impact}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {issue.sources.length} source{issue.sources.length > 1 ? "s" : ""} analyzed
                        </div>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {filteredIssues.length > 3 && (
                <div className="text-center">
                  <Button variant="outline" onClick={() => setActiveTab("detailed")}>
                    View All {filteredIssues.length} Issues
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Detailed Issue Analysis</h3>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="text-sm bg-background border border-border/50 rounded px-2 py-1"
                >
                  <option value="all">All Severities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredIssues.map((issue, index) => {
                const SeverityIcon = getSeverityIcon(issue.severity)
                return (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-border/50 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <SeverityIcon className={`h-6 w-6 ${getSeverityColor(issue.severity).split(" ")[0]}`} />
                        <div>
                          <h4 className="text-lg font-semibold">{issue.metric}</h4>
                          <p className="text-muted-foreground">{issue.discrepancy}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getSeverityColor(issue.severity)}>
                        {issue.severity}
                      </Badge>
                    </div>

                    {/* Source Documents */}
                    <div className="mb-4">
                      <h5 className="font-medium mb-3">Source Documents</h5>
                      <div className="grid gap-3">
                        {issue.sources.map((source, sourceIndex) => (
                          <div
                            key={sourceIndex}
                            className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="h-4 w-4 text-primary" />
                              <div>
                                <p className="font-medium text-sm">{source.document}</p>
                                <p className="text-xs text-muted-foreground">{source.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-primary">{source.value}</span>
                              <Button size="sm" variant="ghost">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact & Recommendation */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <h5 className="font-medium text-yellow-400 mb-2">Impact</h5>
                        <p className="text-sm">{issue.impact}</p>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <h5 className="font-medium text-blue-400 mb-2">Recommendation</h5>
                        <p className="text-sm">{issue.recommendation}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-6 border-t border-border/50">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            Generate Report
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            Request Clarification
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            Flag for Review
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
