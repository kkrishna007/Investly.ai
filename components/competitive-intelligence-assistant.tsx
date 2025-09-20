"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  TrendingUp,
  Building,
  Calendar,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  Eye,
  Filter,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Competitor {
  id: string
  name: string
  stage: string
  totalFunding: string
  lastRound: {
    amount: string
    date: string
    lead: string
  }
  arr: string
  employees: number
  valuation: string
  growthRate: number
  marketShare: number
  strengths: string[]
  weaknesses: string[]
  recentNews: Array<{
    title: string
    date: string
    source: string
    sentiment: "Positive" | "Negative" | "Neutral"
    url: string
  }>
  keyMetrics: {
    customerCount: number
    nps: number
    churnRate: number
    cac: string
  }
  threatLevel: "High" | "Medium" | "Low"
}

interface CompetitiveAnalysis {
  marketPosition: {
    rank: number
    totalCompetitors: number
    marketShare: number
  }
  competitiveAdvantages: string[]
  threats: string[]
  opportunities: string[]
  benchmarkScore: number
  competitors: Competitor[]
}

const mockCompetitiveData: CompetitiveAnalysis = {
  marketPosition: {
    rank: 3,
    totalCompetitors: 8,
    marketShare: 12.5,
  },
  competitiveAdvantages: [
    "Superior technical architecture with 99.9% uptime",
    "Strong enterprise customer base with high retention",
    "Experienced team from top-tier companies",
    "Patent-protected core technology",
  ],
  threats: [
    "Well-funded competitor launching similar product",
    "Market leader expanding into our segment",
    "New regulatory requirements favor incumbents",
  ],
  opportunities: [
    "Competitor's recent security breach creates opening",
    "Market leader focused on enterprise, SMB underserved",
    "International expansion opportunity in APAC",
  ],
  benchmarkScore: 7.2,
  competitors: [
    {
      id: "1",
      name: "TechFlow Solutions",
      stage: "Series C",
      totalFunding: "$45M",
      lastRound: {
        amount: "$25M",
        date: "2024-01-15",
        lead: "Sequoia Capital",
      },
      arr: "$8.2M",
      employees: 120,
      valuation: "$200M",
      growthRate: 180,
      marketShare: 22.5,
      strengths: ["Market leader", "Strong brand", "Enterprise focus"],
      weaknesses: ["High pricing", "Slow innovation", "Poor SMB support"],
      recentNews: [
        {
          title: "TechFlow raises $25M Series C led by Sequoia",
          date: "2024-01-15",
          source: "TechCrunch",
          sentiment: "Positive",
          url: "#",
        },
        {
          title: "Security breach affects 10,000 customers",
          date: "2024-01-10",
          source: "Security Weekly",
          sentiment: "Negative",
          url: "#",
        },
      ],
      keyMetrics: {
        customerCount: 850,
        nps: 42,
        churnRate: 8,
        cac: "$1,200",
      },
      threatLevel: "High",
    },
    {
      id: "2",
      name: "DataSync Pro",
      stage: "Series B",
      totalFunding: "$28M",
      lastRound: {
        amount: "$18M",
        date: "2023-11-20",
        lead: "Andreessen Horowitz",
      },
      arr: "$5.1M",
      employees: 85,
      valuation: "$120M",
      growthRate: 220,
      marketShare: 15.8,
      strengths: ["Fast growth", "Good product-market fit", "Strong engineering"],
      weaknesses: ["Limited enterprise features", "Small team", "Geographic concentration"],
      recentNews: [
        {
          title: "DataSync Pro launches enterprise tier",
          date: "2024-01-08",
          source: "VentureBeat",
          sentiment: "Positive",
          url: "#",
        },
        {
          title: "Key engineering lead joins from Google",
          date: "2023-12-15",
          source: "LinkedIn",
          sentiment: "Positive",
          url: "#",
        },
      ],
      keyMetrics: {
        customerCount: 420,
        nps: 68,
        churnRate: 5,
        cac: "$800",
      },
      threatLevel: "High",
    },
    {
      id: "3",
      name: "CloudBridge",
      stage: "Series A",
      totalFunding: "$12M",
      lastRound: {
        amount: "$8M",
        date: "2023-09-12",
        lead: "First Round Capital",
      },
      arr: "$2.8M",
      employees: 45,
      valuation: "$50M",
      growthRate: 150,
      marketShare: 8.2,
      strengths: ["Innovative features", "Strong developer community", "Low pricing"],
      weaknesses: ["Limited funding", "Small market presence", "Unproven at scale"],
      recentNews: [
        {
          title: "CloudBridge partners with AWS for integration",
          date: "2023-12-20",
          source: "AWS Blog",
          sentiment: "Positive",
          url: "#",
        },
      ],
      keyMetrics: {
        customerCount: 280,
        nps: 72,
        churnRate: 6,
        cac: "$450",
      },
      threatLevel: "Medium",
    },
  ],
}

export function CompetitiveIntelligenceAssistant() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null)
  const [threatFilter, setThreatFilter] = useState<string>("all")
  const data = mockCompetitiveData

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case "High":
        return "text-red-400 border-red-400/50 bg-red-400/10"
      case "Medium":
        return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10"
      case "Low":
        return "text-green-400 border-green-400/50 bg-green-400/10"
      default:
        return "text-muted-foreground border-border/50"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "text-green-400 border-green-400/50"
      case "Negative":
        return "text-red-400 border-red-400/50"
      case "Neutral":
        return "text-yellow-400 border-yellow-400/50"
      default:
        return "text-muted-foreground border-border/50"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-400"
    if (score >= 6) return "text-yellow-400"
    return "text-red-400"
  }

  const filteredCompetitors =
    threatFilter === "all" ? data.competitors : data.competitors.filter((comp) => comp.threatLevel === threatFilter)

  return (
    <Card className="glass glow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-primary" />
            <span>Competitive Intelligence Assistant</span>
          </div>
          <Badge variant="outline" className={`${getScoreColor(data.benchmarkScore)} border-current`}>
            {data.benchmarkScore}/10 Competitive Score
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Market Position</TabsTrigger>
            <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
            <TabsTrigger value="intelligence">Market Intelligence</TabsTrigger>
            <TabsTrigger value="strategy">Strategic Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Market Position Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">#{data.marketPosition.rank}</div>
                <div className="text-xs text-muted-foreground">Market Rank</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">{data.marketPosition.marketShare}%</div>
                <div className="text-xs text-muted-foreground">Market Share</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">{data.marketPosition.totalCompetitors}</div>
                <div className="text-xs text-muted-foreground">Total Competitors</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className={`text-2xl font-bold ${getScoreColor(data.benchmarkScore)}`}>{data.benchmarkScore}</div>
                <div className="text-xs text-muted-foreground">Benchmark Score</div>
              </div>
            </div>

            {/* Competitive Advantages */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                Competitive Advantages
              </h3>
              <div className="space-y-2">
                {data.competitiveAdvantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                  >
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Threats & Opportunities */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                  Key Threats
                </h3>
                <div className="space-y-2">
                  {data.threats.map((threat, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{threat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-400" />
                  Market Opportunities
                </h3>
                <div className="space-y-2">
                  {data.opportunities.map((opportunity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                    >
                      <Target className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-6 mt-6">
            {/* Filter */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Competitor Analysis</h3>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={threatFilter}
                  onChange={(e) => setThreatFilter(e.target.value)}
                  className="text-sm bg-background border border-border/50 rounded px-3 py-1"
                >
                  <option value="all">All Threat Levels</option>
                  <option value="High">High Threat</option>
                  <option value="Medium">Medium Threat</option>
                  <option value="Low">Low Threat</option>
                </select>
              </div>
            </div>

            {/* Competitor Cards */}
            <div className="space-y-4">
              {filteredCompetitors.map((competitor, index) => (
                <motion.div
                  key={competitor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-border/50 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{competitor.name}</h4>
                        <p className="text-muted-foreground">
                          {competitor.stage} • {competitor.employees} employees
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={getThreatColor(competitor.threatLevel)}>
                        {competitor.threatLevel} Threat
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">{competitor.marketShare}% market share</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <div className="text-lg font-bold text-primary">{competitor.totalFunding}</div>
                      <div className="text-xs text-muted-foreground">Total Funding</div>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <div className="text-lg font-bold text-primary">{competitor.arr}</div>
                      <div className="text-xs text-muted-foreground">ARR</div>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <div className="text-lg font-bold text-green-400">{competitor.growthRate}%</div>
                      <div className="text-xs text-muted-foreground">Growth Rate</div>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <div className="text-lg font-bold text-primary">{competitor.valuation}</div>
                      <div className="text-xs text-muted-foreground">Valuation</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="font-medium mb-2 text-green-400">Strengths</h5>
                      <div className="space-y-1">
                        {competitor.strengths.map((strength, idx) => (
                          <div key={idx} className="text-sm flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            <span>{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-red-400">Weaknesses</h5>
                      <div className="space-y-1">
                        {competitor.weaknesses.map((weakness, idx) => (
                          <div key={idx} className="text-sm flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <span>{weakness}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="text-sm text-muted-foreground">
                      Last funding: {competitor.lastRound.amount} from {competitor.lastRound.lead}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedCompetitor(competitor.id)
                        setActiveTab("intelligence")
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6 mt-6">
            {/* Competitor Selection */}
            <div className="flex items-center space-x-4">
              <label className="font-medium">Select Competitor:</label>
              <select
                value={selectedCompetitor || ""}
                onChange={(e) => setSelectedCompetitor(e.target.value)}
                className="bg-background border border-border/50 rounded px-3 py-2"
              >
                <option value="">Choose a competitor...</option>
                {data.competitors.map((competitor) => (
                  <option key={competitor.id} value={competitor.id}>
                    {competitor.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCompetitor && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {(() => {
                  const competitor = data.competitors.find((c) => c.id === selectedCompetitor)!
                  return (
                    <>
                      {/* Competitor Header */}
                      <div className="flex items-center justify-between p-6 bg-muted/20 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{competitor.name}</h3>
                            <p className="text-muted-foreground">
                              {competitor.stage} • {competitor.employees} employees
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getThreatColor(competitor.threatLevel)}>
                          {competitor.threatLevel} Threat
                        </Badge>
                      </div>

                      {/* Key Metrics */}
                      <div>
                        <h4 className="font-semibold mb-4">Key Performance Metrics</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-muted/20 rounded-lg">
                            <div className="text-xl font-bold text-primary">{competitor.keyMetrics.customerCount}</div>
                            <div className="text-xs text-muted-foreground">Customers</div>
                          </div>
                          <div className="text-center p-4 bg-muted/20 rounded-lg">
                            <div className="text-xl font-bold text-primary">{competitor.keyMetrics.nps}</div>
                            <div className="text-xs text-muted-foreground">NPS Score</div>
                          </div>
                          <div className="text-center p-4 bg-muted/20 rounded-lg">
                            <div className="text-xl font-bold text-primary">{competitor.keyMetrics.churnRate}%</div>
                            <div className="text-xs text-muted-foreground">Churn Rate</div>
                          </div>
                          <div className="text-center p-4 bg-muted/20 rounded-lg">
                            <div className="text-xl font-bold text-primary">{competitor.keyMetrics.cac}</div>
                            <div className="text-xs text-muted-foreground">CAC</div>
                          </div>
                        </div>
                      </div>

                      {/* Recent News */}
                      <div>
                        <h4 className="font-semibold mb-4">Recent News & Updates</h4>
                        <div className="space-y-3">
                          {competitor.recentNews.map((news, idx) => (
                            <div key={idx} className="flex items-start justify-between p-4 bg-muted/20 rounded-lg">
                              <div className="flex-1">
                                <h5 className="font-medium mb-1">{news.title}</h5>
                                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                  <span>{news.source}</span>
                                  <span>•</span>
                                  <span>{news.date}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className={getSentimentColor(news.sentiment)}>
                                  {news.sentiment}
                                </Badge>
                                <Button size="sm" variant="ghost">
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Funding History */}
                      <div>
                        <h4 className="font-semibold mb-4">Latest Funding Round</h4>
                        <div className="p-4 bg-muted/20 rounded-lg">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Amount</p>
                              <p className="font-bold text-primary">{competitor.lastRound.amount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Lead Investor</p>
                              <p className="font-medium">{competitor.lastRound.lead}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Date</p>
                              <p className="font-medium">{competitor.lastRound.date}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6 mt-6">
            <div>
              <h3 className="font-semibold mb-6">Strategic Recommendations</h3>

              {/* Competitive Positioning */}
              <div className="space-y-6">
                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-400" />
                    Immediate Actions
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                      <div>
                        <p className="font-medium">Capitalize on TechFlow's Security Issues</p>
                        <p className="text-sm text-muted-foreground">
                          Launch targeted campaign highlighting superior security features to capture displaced
                          customers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                      <div>
                        <p className="font-medium">Accelerate SMB Product Development</p>
                        <p className="text-sm text-muted-foreground">
                          Market leader focuses on enterprise; opportunity to dominate SMB segment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-400" />
                    Long-term Strategy
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                      <div>
                        <p className="font-medium">International Expansion</p>
                        <p className="text-sm text-muted-foreground">
                          APAC market underserved by current competitors; first-mover advantage available
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                      <div>
                        <p className="font-medium">Build Strategic Partnerships</p>
                        <p className="text-sm text-muted-foreground">
                          Partner with cloud providers like AWS to compete with CloudBridge's integration advantage
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                    Risk Mitigation
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                      <div>
                        <p className="font-medium">Monitor DataSync Pro's Enterprise Push</p>
                        <p className="text-sm text-muted-foreground">
                          Fast-growing competitor entering enterprise segment; prepare defensive strategy
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                      <div>
                        <p className="font-medium">Regulatory Compliance Preparation</p>
                        <p className="text-sm text-muted-foreground">
                          New regulations may favor incumbents; ensure compliance readiness
                        </p>
                      </div>
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
            <Search className="h-4 w-4 mr-2" />
            Deep Competitor Research
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <TrendingUp className="h-4 w-4 mr-2" />
            Market Analysis Report
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Set Monitoring Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
