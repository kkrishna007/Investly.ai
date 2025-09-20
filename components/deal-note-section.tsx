"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import {
  Download,
  ExternalLink,
  AlertTriangle,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Shield,
  Zap,
  CheckCircle,
  BarChart3,
} from "lucide-react"

const riskData = [
  { subject: "Market", A: 85, fullMark: 100 },
  { subject: "Team", A: 92, fullMark: 100 },
  { subject: "Financial", A: 78, fullMark: 100 },
  { subject: "Product", A: 88, fullMark: 100 },
  { subject: "Operations", A: 82, fullMark: 100 },
]

const benchmarkData = [
  { name: "ARR Growth", value: 240, benchmark: 180 },
  { name: "CAC Payback", value: 8, benchmark: 12 },
  { name: "Gross Margin", value: 85, benchmark: 75 },
  { name: "Burn Multiple", value: 1.2, benchmark: 2.1 },
]

const mockDealNote = {
  company: "TechFlow AI",
  stage: "Series A",
  amount: "$8M",
  valuation: "$32M",
  sector: "AI/ML Infrastructure",
  overallScore: 8.4,
  recommendation: "Strong Buy",
  keyMetrics: {
    arr: "$2.4M",
    growth: "240% YoY",
    customers: "150+",
    team: "12 employees",
  },
  risks: [
    { level: "High", text: "Competitive market with large incumbents", category: "Market" },
    { level: "Medium", text: "Limited runway (18 months)", category: "Financial" },
    { level: "Low", text: "Strong technical team with domain expertise", category: "Team" },
  ],
  highlights: [
    "Ex-Google AI team with 3 successful exits",
    "Proprietary ML algorithms with patent pending",
    "Enterprise customers including Fortune 500",
    "Strong unit economics with 85% gross margins",
  ],
}

export function DealNoteSection() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <section className="py-24 px-6 animated-gradient">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Interactive{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Deal Analysis
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Comprehensive investment analysis with interactive risk assessment and benchmarking
          </p>
          <div className="flex items-center justify-center mt-4">
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
              Live Demo Preview
            </Badge>
          </div>
        </motion.div>

        {/* Deal Note Dashboard */}
        <motion.div
          className="glass rounded-2xl p-8 glow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{mockDealNote.company}</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="border-primary/50 text-primary">
                  {mockDealNote.stage}
                </Badge>
                <Badge variant="outline" className="border-secondary/50 text-secondary">
                  {mockDealNote.sector}
                </Badge>
                <span className="text-muted-foreground">
                  {mockDealNote.amount} at {mockDealNote.valuation}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-accent">{mockDealNote.overallScore}/10</div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 glow">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="glass rounded-xl p-2 glow mb-8">
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 justify-center text-sm ${
                    activeTab === "overview"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="font-medium">Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab("scorecard")}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 justify-center text-sm ${
                    activeTab === "scorecard"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="font-medium">Scorecard</span>
                </button>
                <button
                  onClick={() => setActiveTab("evidence")}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 justify-center text-sm ${
                    activeTab === "evidence"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="font-medium">Evidence</span>
                </button>
              </div>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Summary */}
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="bg-muted/20 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                      Key Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-accent" />
                        <span className="text-sm">ARR: {mockDealNote.keyMetrics.arr}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-sm">Growth: {mockDealNote.keyMetrics.growth}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-secondary" />
                        <span className="text-sm">Customers: {mockDealNote.keyMetrics.customers}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-accent" />
                        <span className="text-sm">Team: {mockDealNote.keyMetrics.team}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="bg-muted/20 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-accent" />
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {mockDealNote.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risk Assessment */}
                  <div className="bg-muted/20 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-secondary" />
                      Risk Assessment
                    </h4>
                    <div className="space-y-3">
                      {mockDealNote.risks.map((risk, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              risk.level === "High"
                                ? "border-red-500/50 text-red-400"
                                : risk.level === "Medium"
                                  ? "border-yellow-500/50 text-yellow-400"
                                  : "border-green-500/50 text-green-400"
                            }`}
                          >
                            {risk.level}
                          </Badge>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">{risk.category}</div>
                            <div className="text-sm">{risk.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Risk Heatmap */}
                <div className="space-y-6">
                  <div className="bg-muted/20 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-primary" />
                      Risk Heatmap
                    </h4>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={riskData}>
                          <PolarGrid stroke="oklch(0.2 0 0)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }} />
                          <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={{ fill: "oklch(0.6 0 0)", fontSize: 10 }}
                          />
                          <Radar
                            name="Score"
                            dataKey="A"
                            stroke="oklch(0.7 0.15 195)"
                            fill="oklch(0.7 0.15 195 / 0.3)"
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl p-6 border border-accent/30">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Zap className="mr-2 h-5 w-5 text-accent" />
                      Investment Recommendation
                    </h4>
                    <div className="text-2xl font-bold text-accent mb-2">{mockDealNote.recommendation}</div>
                    <p className="text-sm text-muted-foreground">
                      Strong fundamentals with experienced team and proven market traction. Recommended for portfolio
                      inclusion with standard due diligence.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Scorecard Tab */}
            <TabsContent value="scorecard" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="font-semibold">Performance vs Benchmarks</h4>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={benchmarkData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                        <XAxis dataKey="name" tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }} />
                        <YAxis tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "oklch(0.08 0 0)",
                            border: "1px solid oklch(0.2 0 0)",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="value" fill="oklch(0.7 0.15 195)" name="Company" />
                        <Bar dataKey="benchmark" fill="oklch(0.6 0 0)" name="Benchmark" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Detailed Scoring</h4>
                  {riskData.map((item, index) => (
                    <div key={index} className="bg-muted/20 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{item.subject}</span>
                        <span className="text-primary font-semibold">{item.A}/100</span>
                      </div>
                      <Progress value={item.A} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Evidence Tab */}
            <TabsContent value="evidence" className="space-y-6">
              <div className="grid gap-6">
                <div className="bg-muted/20 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">Document Sources</h4>
                  <div className="space-y-3">
                    {[
                      { doc: "Pitch Deck (Slide 12)", claim: "ARR of $2.4M", confidence: "High" },
                      { doc: "Financial Model (Tab 3)", claim: "240% YoY Growth", confidence: "High" },
                      { doc: "Team Bios (Page 2)", claim: "Ex-Google AI team", confidence: "Verified" },
                      { doc: "Customer List", claim: "150+ customers", confidence: "Medium" },
                    ].map((evidence, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{evidence.claim}</div>
                          <div className="text-xs text-muted-foreground">{evidence.doc}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              evidence.confidence === "High" || evidence.confidence === "Verified"
                                ? "border-green-500/50 text-green-400"
                                : "border-yellow-500/50 text-yellow-400"
                            }`}
                          >
                            {evidence.confidence}
                          </Badge>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
