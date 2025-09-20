"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  BarChart3,
  Users,
  AlertTriangle,
  TrendingUp,
  Building,
  DollarSign,
  Target,
  Shield,
  Zap,
  Globe,
  Calculator,
} from "lucide-react"
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
  Line,
  Area,
  AreaChart,
} from "recharts"
import { TAMRealityCheck } from "@/components/tam-reality-check"
import { ConsistencyChecker } from "@/components/consistency-checker"
import { MissingMetricsDetector } from "@/components/missing-metrics-detector"
import { VanityMetricsFilter } from "@/components/vanity-metrics-filter"
import { FounderCredibilitySystem } from "@/components/founder-credibility-system"
import { CompetitiveIntelligenceAssistant } from "@/components/competitive-intelligence-assistant"

const riskData = [
  { subject: "Market", A: 85, fullMark: 100 },
  { subject: "Team", A: 92, fullMark: 100 },
  { subject: "Financial", A: 78, fullMark: 100 },
  { subject: "Product", A: 88, fullMark: 100 },
  { subject: "Operations", A: 82, fullMark: 100 },
  { subject: "Legal", A: 90, fullMark: 100 },
]

const benchmarkData = [
  { name: "ARR Growth", value: 240, benchmark: 180 },
  { name: "CAC Payback", value: 8, benchmark: 12 },
  { name: "Gross Margin", value: 85, benchmark: 75 },
  { name: "Burn Multiple", value: 1.2, benchmark: 2.1 },
  { name: "NPS Score", value: 72, benchmark: 50 },
]

const revenueGrowthData = [
  { month: "Jan", revenue: 180, projection: 175 },
  { month: "Feb", revenue: 220, projection: 210 },
  { month: "Mar", revenue: 280, projection: 250 },
  { month: "Apr", revenue: 340, projection: 300 },
  { month: "May", revenue: 420, projection: 360 },
  { month: "Jun", revenue: 520, projection: 430 },
]

const cohortData = [
  { cohort: "Q1 2023", retention: 95, revenue: 120 },
  { cohort: "Q2 2023", retention: 88, revenue: 180 },
  { cohort: "Q3 2023", retention: 92, revenue: 240 },
  { cohort: "Q4 2023", retention: 89, revenue: 320 },
  { cohort: "Q1 2024", retention: 94, revenue: 420 },
]

interface CompanyTabsProps {
  company: any
}

export function CompanyTabs({ company }: CompanyTabsProps) {
  const [activeTab, setActiveTab] = useState("deal-memo")

  const tabs = [
    { id: "deal-memo", label: "Deal Memo", icon: FileText },
    { id: "tam-check", label: "TAM Reality Check", icon: Globe },
    { id: "consistency-check", label: "Consistency Check", icon: AlertTriangle },
    { id: "missing-metrics", label: "Missing Metrics", icon: Calculator },
    { id: "vanity-filter", label: "Vanity Metrics", icon: Target },
    { id: "competitive-intel", label: "Competitive Intel", icon: BarChart3 },
    { id: "founder-credibility", label: "Founder Analysis", icon: Users },
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="glass rounded-xl p-2 glow">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 justify-center text-sm ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass p-8 rounded-2xl glow"
      >
        {activeTab === "deal-memo" && <DealMemoTab company={company} />}
        {activeTab === "tam-check" && <TAMRealityCheckTab company={company} />}
        {activeTab === "consistency-check" && <ConsistencyCheckTab company={company} />}
        {activeTab === "missing-metrics" && <MissingMetricsTab company={company} />}
        {activeTab === "vanity-filter" && <VanityMetricsTab company={company} />}
        {activeTab === "competitive-intel" && <CompetitiveIntelTab company={company} />}
        {activeTab === "founder-credibility" && <FounderCredibilityTab company={company} />}
      </motion.div>
    </div>
  )
}

function DealMemoTab({ company }: { company: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">AI-Generated Deal Memo</h2>

        {/* Executive Summary */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Summary */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Building className="h-5 w-5 mr-2 text-primary" />
                Company Overview
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {company.name} is a {company.sector.toLowerCase()} company founded in {company.founded}, currently in
                the {company.stage.toLowerCase()} stage. The company has demonstrated
                {company.trend === "up" ? " strong growth momentum" : " mixed performance"} with current revenue of{" "}
                {company.arr}. Based in {company.location}, the team consists of
                {company.employees} employees focused on delivering innovative solutions in their market segment.
              </p>
            </div>

            <div className="bg-muted/20 rounded-xl p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                Key Metrics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-accent" />
                  <span className="text-sm">ARR: {company.arr}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm">Growth: 240% YoY</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Customers: 150+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-accent" />
                  <span className="text-sm">Team: {company.employees}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/20 rounded-xl p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-secondary" />
                Risk Assessment
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="border-red-500/50 text-red-400 text-xs">
                    High
                  </Badge>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">Market</div>
                    <div className="text-sm">Competitive market with large incumbents</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs">
                    Medium
                  </Badge>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">Financial</div>
                    <div className="text-sm">Limited runway (18 months)</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">
                    Low
                  </Badge>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">Team</div>
                    <div className="text-sm">Strong technical team with domain expertise</div>
                  </div>
                </div>
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
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "oklch(0.6 0 0)", fontSize: 10 }} />
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

            <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl p-6 border border-accent/30">
              <h4 className="font-semibold mb-2 flex items-center">
                <Zap className="mr-2 h-5 w-5 text-accent" />
                Investment Recommendation
              </h4>
              <div className="text-2xl font-bold text-accent mb-2">Strong Buy</div>
              <p className="text-sm text-muted-foreground">
                Strong fundamentals with experienced team and proven market traction. Recommended for portfolio
                inclusion with standard due diligence.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-muted/20 rounded-xl p-6">
            <h4 className="font-semibold mb-4">Performance vs Benchmarks</h4>
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

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-muted/20 rounded-xl p-6">
            <h4 className="font-semibold mb-4">Revenue Growth Trajectory</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                  <XAxis dataKey="month" tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.08 0 0)",
                      border: "1px solid oklch(0.2 0 0)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="oklch(0.7 0.15 195)"
                    fill="oklch(0.7 0.15 195 / 0.3)"
                    name="Actual Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="projection"
                    stroke="oklch(0.6 0 0)"
                    strokeDasharray="5 5"
                    name="Projection"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-muted/20 rounded-xl p-6">
            <h4 className="font-semibold mb-4">Customer Cohort Analysis</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cohortData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                  <XAxis dataKey="cohort" tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.08 0 0)",
                      border: "1px solid oklch(0.2 0 0)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="retention" fill="oklch(0.7 0.15 195)" name="Retention %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConsistencyCheckTab({ company }: { company: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Cross-Document Consistency Analysis</h2>
        <p className="text-muted-foreground mb-8">
          Automated detection of discrepancies across pitch decks, financial models, and founder communications.
        </p>
        <ConsistencyChecker />
      </div>
    </div>
  )
}

function MissingMetricsTab({ company }: { company: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Missing Metrics Analysis</h2>
        <p className="text-muted-foreground mb-8">
          Identify critical business metrics that are absent from founder materials and generate request templates.
        </p>
        <MissingMetricsDetector />
      </div>
    </div>
  )
}

function VanityMetricsTab({ company }: { company: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Vanity Metrics Analysis</h2>
        <p className="text-muted-foreground mb-8">
          Distinguish between meaningful revenue metrics and vanity metrics like signups or pipeline value.
        </p>
        <VanityMetricsFilter />
      </div>
    </div>
  )
}

function CompetitiveIntelTab({ company }: { company: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Competitive Intelligence Analysis</h2>
        <p className="text-muted-foreground mb-8">
          Real-time competitive landscape mapping with funding data and missing competitor detection.
        </p>
        <CompetitiveIntelligenceAssistant />
      </div>
    </div>
  )
}

function FounderCredibilityTab({ company }: { company: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Founder Credibility Assessment</h2>
        <p className="text-muted-foreground mb-8">
          Comprehensive founder background verification with risk scoring and social proof analysis.
        </p>
        <FounderCredibilitySystem />
      </div>
    </div>
  )
}

function TAMRealityCheckTab({ company }: { company: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Total Addressable Market Analysis</h2>
        <p className="text-muted-foreground mb-8">
          AI-powered validation of market size claims against verified industry data sources.
        </p>

        <TAMRealityCheck />

        {/* Additional Context */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-muted/20 rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2 text-primary" />
              Market Context for {company.sector}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Maturity:</span>
                <span className="font-medium">Growth Stage</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Key Players:</span>
                <span className="font-medium">5-10 Major</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. CAGR:</span>
                <span className="font-medium text-green-400">12-15%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Regulatory Risk:</span>
                <span className="font-medium text-yellow-400">Medium</span>
              </div>
            </div>
          </div>

          <div className="bg-muted/20 rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-secondary" />
              Addressable Market Breakdown
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Serviceable Addressable Market (SAM)</span>
                  <span className="font-medium">$4.2B</span>
                </div>
                <Progress value={34} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Serviceable Obtainable Market (SOM)</span>
                  <span className="font-medium">$840M</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div className="text-xs text-muted-foreground mt-3">
                Based on company's current capabilities and 5-year expansion plan
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
