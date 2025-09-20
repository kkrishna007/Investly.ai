"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calculator,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Clock,
  Mail,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface MetricStatus {
  id: string
  name: string
  category: "Financial" | "Customer" | "Product" | "Team" | "Market"
  status: "Present" | "Missing" | "Incomplete" | "Unclear"
  importance: "Critical" | "High" | "Medium" | "Low"
  description: string
  foundIn?: string[]
  missingReason?: string
  impact: string
  requestTemplate?: string
}

interface MissingMetricsReport {
  completenessScore: number
  totalMetrics: number
  presentMetrics: number
  missingCritical: number
  categories: {
    [key: string]: {
      present: number
      missing: number
      total: number
    }
  }
  metrics: MetricStatus[]
}

const mockMetricsData: MissingMetricsReport = {
  completenessScore: 68,
  totalMetrics: 25,
  presentMetrics: 17,
  missingCritical: 3,
  categories: {
    Financial: { present: 6, missing: 2, total: 8 },
    Customer: { present: 4, missing: 2, total: 6 },
    Product: { present: 3, missing: 2, total: 5 },
    Team: { present: 2, missing: 1, total: 3 },
    Market: { present: 2, missing: 1, total: 3 },
  },
  metrics: [
    {
      id: "1",
      name: "Customer Acquisition Cost (CAC)",
      category: "Financial",
      status: "Missing",
      importance: "Critical",
      description: "Cost to acquire a new customer including sales and marketing expenses",
      missingReason: "Not mentioned in any documents",
      impact: "Cannot assess unit economics or scalability",
      requestTemplate:
        "Please provide your blended CAC calculation including all sales and marketing costs for the last 12 months.",
    },
    {
      id: "2",
      name: "Lifetime Value (LTV)",
      category: "Customer",
      status: "Missing",
      importance: "Critical",
      description: "Total revenue expected from a customer over their entire relationship",
      missingReason: "No cohort analysis or retention data provided",
      impact: "Unable to evaluate LTV:CAC ratio and long-term profitability",
      requestTemplate: "Please share customer cohort analysis and LTV calculations based on historical retention data.",
    },
    {
      id: "3",
      name: "Monthly Churn Rate",
      category: "Customer",
      status: "Missing",
      importance: "Critical",
      description: "Percentage of customers who cancel their subscription each month",
      missingReason: "Only mentioned 'low churn' without specific numbers",
      impact: "Critical for SaaS valuation and growth projections",
      requestTemplate: "Please provide monthly gross and net churn rates for the past 12 months.",
    },
    {
      id: "4",
      name: "Net Revenue Retention (NRR)",
      category: "Customer",
      status: "Incomplete",
      importance: "High",
      description: "Revenue retention including expansion from existing customers",
      foundIn: ["Call Transcript"],
      missingReason: "Mentioned as '110%+' but no detailed breakdown",
      impact: "Important for understanding expansion revenue potential",
      requestTemplate: "Please provide detailed NRR calculation with expansion vs. contraction breakdown.",
    },
    {
      id: "5",
      name: "Gross Margin by Product Line",
      category: "Financial",
      status: "Incomplete",
      importance: "High",
      description: "Profitability breakdown by different product offerings",
      foundIn: ["Financial Model"],
      missingReason: "Only overall gross margin provided (85%)",
      impact: "Need to understand profitability of different revenue streams",
      requestTemplate: "Please break down gross margins by product line or customer segment.",
    },
    {
      id: "6",
      name: "Sales Cycle Length",
      category: "Customer",
      status: "Missing",
      importance: "High",
      description: "Average time from first contact to closed deal",
      missingReason: "Not mentioned in sales process discussion",
      impact: "Important for forecasting and sales capacity planning",
      requestTemplate: "What is your average sales cycle length by customer segment?",
    },
    {
      id: "7",
      name: "Product-Market Fit Score",
      category: "Product",
      status: "Missing",
      importance: "Medium",
      description: "Quantitative measure of product-market fit (e.g., Sean Ellis test)",
      missingReason: "No formal PMF measurement mentioned",
      impact: "Helps assess product stickiness and growth potential",
      requestTemplate: "Have you conducted any formal product-market fit surveys or NPS studies?",
    },
    {
      id: "8",
      name: "Employee Retention Rate",
      category: "Team",
      status: "Missing",
      importance: "Medium",
      description: "Percentage of employees retained over a 12-month period",
      missingReason: "Team growth mentioned but no retention metrics",
      impact: "Important for assessing team stability and culture",
      requestTemplate: "What is your annual employee retention rate and key reasons for departures?",
    },
  ],
}

export function MissingMetricsDetector() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedImportance, setSelectedImportance] = useState<string>("all")
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null)
  const data = mockMetricsData

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "text-green-400 border-green-400/50 bg-green-400/10"
      case "Missing":
        return "text-red-400 border-red-400/50 bg-red-400/10"
      case "Incomplete":
        return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10"
      case "Unclear":
        return "text-orange-400 border-orange-400/50 bg-orange-400/10"
      default:
        return "text-muted-foreground border-border/50"
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "Critical":
        return "text-red-400 border-red-400/50"
      case "High":
        return "text-orange-400 border-orange-400/50"
      case "Medium":
        return "text-yellow-400 border-yellow-400/50"
      case "Low":
        return "text-blue-400 border-blue-400/50"
      default:
        return "text-muted-foreground border-border/50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
        return CheckCircle
      case "Missing":
        return XCircle
      case "Incomplete":
      case "Unclear":
        return AlertTriangle
      default:
        return AlertTriangle
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Financial":
        return DollarSign
      case "Customer":
        return Users
      case "Product":
        return Target
      case "Team":
        return Users
      case "Market":
        return TrendingUp
      default:
        return Calculator
    }
  }

  const getCompletenessColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const filteredMetrics = data.metrics.filter((metric) => {
    const categoryMatch = selectedCategory === "all" || metric.category === selectedCategory
    const importanceMatch = selectedImportance === "all" || metric.importance === selectedImportance
    return categoryMatch && importanceMatch
  })

  const generateRequestList = () => {
    const missingMetrics = data.metrics.filter((m) => m.status === "Missing" || m.status === "Incomplete")
    return missingMetrics.map((m) => m.requestTemplate).join("\n\n")
  }

  return (
    <Card className="glass glow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-primary" />
            <span>Missing Metrics Detector</span>
          </div>
          <Badge variant="outline" className={`${getCompletenessColor(data.completenessScore)} border-current`}>
            {data.completenessScore}% Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className={`text-2xl font-bold ${getCompletenessColor(data.completenessScore)}`}>
              {data.completenessScore}%
            </div>
            <div className="text-xs text-muted-foreground">Completeness</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{data.presentMetrics}</div>
            <div className="text-xs text-muted-foreground">Present Metrics</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">{data.totalMetrics - data.presentMetrics}</div>
            <div className="text-xs text-muted-foreground">Missing Metrics</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-red-400">{data.missingCritical}</div>
            <div className="text-xs text-muted-foreground">Critical Missing</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          <h3 className="font-semibold mb-4">Completeness by Category</h3>
          <div className="grid gap-4">
            {Object.entries(data.categories).map(([category, stats]) => {
              const CategoryIcon = getCategoryIcon(category)
              const completeness = Math.round((stats.present / stats.total) * 100)
              return (
                <div key={category} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CategoryIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{category}</p>
                      <p className="text-sm text-muted-foreground">
                        {stats.present} of {stats.total} metrics
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getCompletenessColor(completeness)}`}>{completeness}%</div>
                    <Progress value={completeness} className="w-20 h-2" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm bg-background border border-border/50 rounded px-3 py-1"
            >
              <option value="all">All Categories</option>
              {Object.keys(data.categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Importance:</label>
            <select
              value={selectedImportance}
              onChange={(e) => setSelectedImportance(e.target.value)}
              className="text-sm bg-background border border-border/50 rounded px-3 py-1"
            >
              <option value="all">All Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Metrics List */}
        <div className="space-y-4">
          <h3 className="font-semibold">Detailed Analysis ({filteredMetrics.length} metrics)</h3>
          <div className="space-y-3">
            {filteredMetrics.map((metric, index) => {
              const StatusIcon = getStatusIcon(metric.status)
              const CategoryIcon = getCategoryIcon(metric.category)
              const isExpanded = expandedMetric === metric.id

              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-border/50 rounded-lg overflow-hidden"
                >
                  <div
                    className="p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                    onClick={() => setExpandedMetric(isExpanded ? null : metric.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <StatusIcon className={`h-5 w-5 ${getStatusColor(metric.status).split(" ")[0]}`} />
                        <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{metric.name}</h4>
                          <p className="text-sm text-muted-foreground">{metric.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getImportanceColor(metric.importance)}>
                          {metric.importance}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-border/50 p-4 bg-muted/10"
                    >
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium mb-2">Description</h5>
                          <p className="text-sm text-muted-foreground">{metric.description}</p>
                        </div>

                        {metric.foundIn && (
                          <div>
                            <h5 className="font-medium mb-2">Found In</h5>
                            <div className="flex flex-wrap gap-2">
                              {metric.foundIn.map((doc, idx) => (
                                <Badge key={idx} variant="outline" className="text-green-400 border-green-400/50">
                                  <FileText className="h-3 w-3 mr-1" />
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {metric.missingReason && (
                          <div>
                            <h5 className="font-medium mb-2">Missing Reason</h5>
                            <p className="text-sm text-muted-foreground">{metric.missingReason}</p>
                          </div>
                        )}

                        <div>
                          <h5 className="font-medium mb-2">Impact</h5>
                          <p className="text-sm text-muted-foreground">{metric.impact}</p>
                        </div>

                        {metric.requestTemplate && (
                          <div>
                            <h5 className="font-medium mb-2">Request Template</h5>
                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                              <p className="text-sm">{metric.requestTemplate}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-6 border-t border-border/50">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Mail className="h-4 w-4 mr-2" />
            Generate Request List
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            Export Analysis
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Clock className="h-4 w-4 mr-2" />
            Set Follow-up
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
