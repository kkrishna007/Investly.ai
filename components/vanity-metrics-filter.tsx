"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Filter,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Zap,
  Info,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Metric {
  id: string
  name: string
  value: string
  category: "Financial" | "Customer" | "Product" | "Marketing" | "Operational"
  type: "Vanity" | "Actionable" | "Contextual"
  vanityScore: number
  issues: string[]
  betterAlternatives: string[]
  context?: string
  trend?: "up" | "down" | "stable"
  foundIn: string[]
  explanation: string
  actionableInsight?: string
}

interface VanityMetricsAnalysis {
  totalMetrics: number
  vanityMetrics: number
  actionableMetrics: number
  vanityScore: number
  recommendations: string[]
  metrics: Metric[]
}

const mockVanityData: VanityMetricsAnalysis = {
  totalMetrics: 15,
  vanityMetrics: 6,
  actionableMetrics: 9,
  vanityScore: 40,
  recommendations: [
    "Focus on revenue metrics instead of user registrations",
    "Track customer lifetime value rather than total downloads",
    "Measure engagement depth, not just page views",
    "Report on retention cohorts instead of cumulative users",
  ],
  metrics: [
    {
      id: "1",
      name: "Total App Downloads",
      value: "500K+",
      category: "Marketing",
      type: "Vanity",
      vanityScore: 85,
      issues: [
        "Downloads don't indicate actual usage or value",
        "No correlation with revenue or retention",
        "Easy to inflate with marketing spend",
      ],
      betterAlternatives: ["Daily/Monthly Active Users (DAU/MAU)", "User activation rate", "Time to first value"],
      trend: "up",
      foundIn: ["Pitch Deck", "Marketing Materials"],
      explanation:
        "While impressive sounding, download numbers don't reflect actual business value or user engagement.",
    },
    {
      id: "2",
      name: "Social Media Followers",
      value: "25K followers",
      category: "Marketing",
      type: "Vanity",
      vanityScore: 90,
      issues: [
        "Followers can be bought or inflated",
        "No direct correlation to business outcomes",
        "Doesn't measure engagement quality",
      ],
      betterAlternatives: [
        "Social media conversion rate",
        "Customer acquisition from social channels",
        "Engagement rate and quality",
      ],
      trend: "up",
      foundIn: ["Pitch Deck"],
      explanation:
        "Follower count is easily manipulated and doesn't translate to business value or customer acquisition.",
    },
    {
      id: "3",
      name: "Website Page Views",
      value: "1M+ monthly",
      category: "Marketing",
      type: "Vanity",
      vanityScore: 75,
      issues: [
        "Page views don't indicate user intent or value",
        "Can be inflated by bots or poor UX",
        "No connection to conversion or revenue",
      ],
      betterAlternatives: ["Conversion rate from traffic", "Time spent on key pages", "Lead generation rate"],
      trend: "up",
      foundIn: ["Analytics Dashboard"],
      explanation: "High page views might indicate poor navigation or bot traffic rather than genuine user interest.",
    },
    {
      id: "4",
      name: "Total Registered Users",
      value: "100K users",
      category: "Product",
      type: "Vanity",
      vanityScore: 80,
      issues: [
        "Registration doesn't equal active usage",
        "Many users register but never return",
        "Cumulative metric hides churn",
      ],
      betterAlternatives: ["Monthly Active Users (MAU)", "User activation rate", "Cohort retention analysis"],
      trend: "up",
      foundIn: ["Pitch Deck", "Product Dashboard"],
      explanation: "Total registrations include inactive users and don't reflect current product engagement or value.",
    },
    {
      id: "5",
      name: "Press Mentions",
      value: "50+ articles",
      category: "Marketing",
      type: "Vanity",
      vanityScore: 95,
      issues: [
        "Press mentions don't drive business results",
        "Quality and reach vary dramatically",
        "No correlation with customer acquisition",
      ],
      betterAlternatives: ["Customers acquired from PR", "Brand awareness surveys", "Organic search traffic increase"],
      trend: "stable",
      foundIn: ["PR Report"],
      explanation:
        "Press coverage is nice for ego but rarely translates to meaningful business outcomes or customer growth.",
    },
    {
      id: "6",
      name: "Email Newsletter Subscribers",
      value: "15K subscribers",
      category: "Marketing",
      type: "Vanity",
      vanityScore: 70,
      issues: [
        "Subscriber count doesn't indicate engagement",
        "Many subscribers are inactive",
        "No direct revenue correlation shown",
      ],
      betterAlternatives: [
        "Email open and click-through rates",
        "Conversion rate from email campaigns",
        "Revenue attributed to email marketing",
      ],
      context: "Could be actionable if engagement metrics are provided",
      trend: "up",
      foundIn: ["Marketing Dashboard"],
      explanation: "Subscriber count alone is meaningless without engagement and conversion data.",
    },
    {
      id: "7",
      name: "Monthly Recurring Revenue (MRR)",
      value: "$45K",
      category: "Financial",
      type: "Actionable",
      vanityScore: 10,
      issues: [],
      betterAlternatives: [],
      trend: "up",
      foundIn: ["Financial Dashboard"],
      explanation: "MRR is a core actionable metric that directly reflects business health and growth.",
      actionableInsight: "Strong MRR growth indicates healthy recurring business model.",
    },
    {
      id: "8",
      name: "Customer Acquisition Cost (CAC)",
      value: "$120",
      category: "Financial",
      type: "Actionable",
      vanityScore: 15,
      issues: [],
      betterAlternatives: [],
      trend: "down",
      foundIn: ["Financial Model"],
      explanation: "CAC is essential for understanding unit economics and scalability.",
      actionableInsight: "Decreasing CAC shows improving marketing efficiency.",
    },
    {
      id: "9",
      name: "Net Promoter Score (NPS)",
      value: "72",
      category: "Customer",
      type: "Actionable",
      vanityScore: 20,
      issues: [],
      betterAlternatives: [],
      trend: "up",
      foundIn: ["Customer Survey"],
      explanation: "NPS indicates customer satisfaction and likelihood to recommend, predicting growth.",
      actionableInsight: "High NPS suggests strong product-market fit and potential for organic growth.",
    },
    {
      id: "10",
      name: "Monthly Churn Rate",
      value: "3.2%",
      category: "Customer",
      type: "Actionable",
      vanityScore: 5,
      issues: [],
      betterAlternatives: [],
      trend: "down",
      foundIn: ["Analytics Dashboard"],
      explanation: "Churn rate directly impacts growth and lifetime value calculations.",
      actionableInsight: "Low and decreasing churn indicates strong product stickiness.",
    },
  ],
}

export function VanityMetricsFilter() {
  const [activeTab, setActiveTab] = useState("analysis")
  const [showVanityMetrics, setShowVanityMetrics] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const data = mockVanityData

  const getVanityScoreColor = (score: number) => {
    if (score >= 70) return "text-red-400"
    if (score >= 40) return "text-yellow-400"
    return "text-green-400"
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Vanity":
        return "text-red-400 border-red-400/50 bg-red-400/10"
      case "Actionable":
        return "text-green-400 border-green-400/50 bg-green-400/10"
      case "Contextual":
        return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10"
      default:
        return "text-muted-foreground border-border/50"
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
      case "Marketing":
        return TrendingUp
      case "Operational":
        return Zap
      default:
        return Target
    }
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-400" />
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-400 rotate-180" />
      case "stable":
        return <div className="w-3 h-0.5 bg-yellow-400" />
      default:
        return null
    }
  }

  const filteredMetrics = data.metrics.filter((metric) => {
    const categoryMatch = selectedCategory === "all" || metric.category === selectedCategory
    const typeMatch = selectedType === "all" || metric.type === selectedType
    const visibilityMatch = showVanityMetrics || metric.type !== "Vanity"
    return categoryMatch && typeMatch && visibilityMatch
  })

  const vanityMetrics = data.metrics.filter((m) => m.type === "Vanity")
  const actionableMetrics = data.metrics.filter((m) => m.type === "Actionable")

  return (
    <Card className="glass glow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <span>Vanity Metrics Filter</span>
          </div>
          <Badge variant="outline" className={`${getVanityScoreColor(data.vanityScore)} border-current`}>
            {data.vanityScore}% Vanity Score
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Metrics Analysis</TabsTrigger>
            <TabsTrigger value="filtered">Filtered View</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6 mt-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">{data.totalMetrics}</div>
                <div className="text-xs text-muted-foreground">Total Metrics</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-red-400">{data.vanityMetrics}</div>
                <div className="text-xs text-muted-foreground">Vanity Metrics</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{data.actionableMetrics}</div>
                <div className="text-xs text-muted-foreground">Actionable Metrics</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className={`text-2xl font-bold ${getVanityScoreColor(data.vanityScore)}`}>{data.vanityScore}%</div>
                <div className="text-xs text-muted-foreground">Vanity Score</div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <XCircle className="h-5 w-5 mr-2 text-red-400" />
                  Vanity Metrics ({vanityMetrics.length})
                </h3>
                <div className="space-y-3">
                  {vanityMetrics.slice(0, 3).map((metric, index) => {
                    const CategoryIcon = getCategoryIcon(metric.category)
                    return (
                      <motion.div
                        key={metric.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <CategoryIcon className="h-4 w-4 text-red-400" />
                            <span className="font-medium text-sm">{metric.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(metric.trend)}
                            <span className="text-sm font-bold">{metric.value}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{metric.explanation}</p>
                      </motion.div>
                    )
                  })}
                  {vanityMetrics.length > 3 && (
                    <div className="text-center">
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("filtered")}>
                        View All {vanityMetrics.length} Vanity Metrics
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Actionable Metrics ({actionableMetrics.length})
                </h3>
                <div className="space-y-3">
                  {actionableMetrics.slice(0, 3).map((metric, index) => {
                    const CategoryIcon = getCategoryIcon(metric.category)
                    return (
                      <motion.div
                        key={metric.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <CategoryIcon className="h-4 w-4 text-green-400" />
                            <span className="font-medium text-sm">{metric.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(metric.trend)}
                            <span className="text-sm font-bold">{metric.value}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{metric.actionableInsight}</p>
                      </motion.div>
                    )
                  })}
                  {actionableMetrics.length > 3 && (
                    <div className="text-center">
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("filtered")}>
                        View All {actionableMetrics.length} Actionable Metrics
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="filtered" className="space-y-6 mt-6">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Switch checked={showVanityMetrics} onCheckedChange={setShowVanityMetrics} id="show-vanity" />
                <label htmlFor="show-vanity" className="text-sm font-medium">
                  Show Vanity Metrics
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-sm bg-background border border-border/50 rounded px-3 py-1"
                >
                  <option value="all">All Categories</option>
                  <option value="Financial">Financial</option>
                  <option value="Customer">Customer</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operational">Operational</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Type:</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="text-sm bg-background border border-border/50 rounded px-3 py-1"
                >
                  <option value="all">All Types</option>
                  <option value="Vanity">Vanity</option>
                  <option value="Actionable">Actionable</option>
                  <option value="Contextual">Contextual</option>
                </select>
              </div>
            </div>

            {/* Filtered Metrics */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filtered Metrics ({filteredMetrics.length})</h3>
                <div className="flex items-center space-x-2">
                  {showVanityMetrics ? (
                    <Eye className="h-4 w-4 text-green-400" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-red-400" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {showVanityMetrics ? "Showing all metrics" : "Hiding vanity metrics"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {filteredMetrics.map((metric, index) => {
                  const CategoryIcon = getCategoryIcon(metric.category)
                  return (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-border/50 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <CategoryIcon className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">{metric.name}</h4>
                            <p className="text-sm text-muted-foreground">{metric.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getTypeColor(metric.type)}>
                            {metric.type}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(metric.trend)}
                            <span className="font-bold text-primary">{metric.value}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm mb-3">{metric.explanation}</p>

                      {metric.type === "Vanity" && (
                        <div className="space-y-3">
                          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <h5 className="font-medium text-red-400 mb-2">Issues</h5>
                            <ul className="space-y-1">
                              {metric.issues.map((issue, idx) => (
                                <li key={idx} className="text-sm flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                  <span>{issue}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <h5 className="font-medium text-green-400 mb-2">Better Alternatives</h5>
                            <ul className="space-y-1">
                              {metric.betterAlternatives.map((alt, idx) => (
                                <li key={idx} className="text-sm flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                                  <span>{alt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {metric.actionableInsight && (
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <h5 className="font-medium text-blue-400 mb-2">Insight</h5>
                          <p className="text-sm">{metric.actionableInsight}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                        <div className="text-xs text-muted-foreground">Found in: {metric.foundIn.join(", ")}</div>
                        {metric.type === "Vanity" && (
                          <Badge
                            variant="outline"
                            className={`${getVanityScoreColor(metric.vanityScore)} border-current`}
                          >
                            {metric.vanityScore}% Vanity
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6 mt-6">
            <div>
              <h3 className="font-semibold mb-6">Strategic Recommendations</h3>

              {/* Key Recommendations */}
              <div className="space-y-4 mb-8">
                {data.recommendations.map((recommendation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                  >
                    <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{recommendation}</p>
                  </motion.div>
                ))}
              </div>

              {/* Action Plan */}
              <div className="space-y-6">
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                    Immediate Actions
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                      <div>
                        <p className="font-medium">Request Core Business Metrics</p>
                        <p className="text-sm text-muted-foreground">
                          Ask for MRR, CAC, LTV, churn rate, and other unit economics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                      <div>
                        <p className="font-medium">Challenge Vanity Metrics</p>
                        <p className="text-sm text-muted-foreground">
                          Question the business relevance of downloads, followers, and page views
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                    Red Flags to Watch
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                      <div>
                        <p className="font-medium">Overemphasis on Vanity Metrics</p>
                        <p className="text-sm text-muted-foreground">
                          Founders focusing on impressive-sounding but meaningless numbers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                      <div>
                        <p className="font-medium">Missing Financial Fundamentals</p>
                        <p className="text-sm text-muted-foreground">
                          Lack of basic unit economics and revenue quality metrics
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blue-400" />
                    What to Request Instead
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Financial Health</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Monthly Recurring Revenue (MRR)</li>
                        <li>• Customer Acquisition Cost (CAC)</li>
                        <li>• Customer Lifetime Value (LTV)</li>
                        <li>• Gross margin by cohort</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Product Engagement</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Daily/Monthly Active Users</li>
                        <li>• Feature adoption rates</li>
                        <li>• Time to first value</li>
                        <li>• User retention cohorts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-6 border-t border-border/50">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Target className="h-4 w-4 mr-2" />
            Request Better Metrics
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Info className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
