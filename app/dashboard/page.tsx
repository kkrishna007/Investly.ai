"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Plus, TrendingUp, TrendingDown, AlertTriangle, Clock, Star } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { UploadModal } from "@/components/upload-modal"
import { ThemeToggle } from "@/components/theme-toggle"

const companies = [
  {
    id: "techstart-inc",
    name: "TechStart Inc.",
    sector: "SaaS Platform",
    arr: "$2M ARR",
    stage: "Series A",
    risk: "Low Risk",
    riskColor: "text-green-400",
    analyzed: "2 hours ago",
    aiScore: 8.2,
    scoreColor: "text-green-400",
    trend: "up",
  },
  {
    id: "fintech-solutions",
    name: "FinTech Solutions",
    sector: "Digital Banking",
    arr: "$500K MRR",
    stage: "Seed Round",
    risk: "Medium Risk",
    riskColor: "text-yellow-400",
    analyzed: "yesterday",
    aiScore: 6.7,
    scoreColor: "text-yellow-400",
    trend: "up",
  },
  {
    id: "healthtech-ai",
    name: "HealthTech AI",
    sector: "Medical Diagnostics",
    arr: "Pre-Revenue",
    stage: "Pre-Seed",
    risk: "High Risk",
    riskColor: "text-red-400",
    analyzed: "3 days ago",
    aiScore: 4.1,
    scoreColor: "text-red-400",
    trend: "down",
  },
  {
    id: "greentech-energy",
    name: "GreenTech Energy",
    sector: "Clean Energy",
    arr: "$1.2M ARR",
    stage: "Series A",
    risk: "Medium Risk",
    riskColor: "text-yellow-400",
    analyzed: "1 week ago",
    aiScore: 7.5,
    scoreColor: "text-green-400",
    trend: "up",
  },
  {
    id: "edtech-platform",
    name: "EdTech Platform",
    sector: "Education Technology",
    arr: "$800K ARR",
    stage: "Seed Round",
    risk: "Low Risk",
    riskColor: "text-green-400",
    analyzed: "2 weeks ago",
    aiScore: 7.8,
    scoreColor: "text-green-400",
    trend: "up",
  },
  {
    id: "robotics-startup",
    name: "Robotics Startup",
    sector: "Industrial Automation",
    arr: "Pre-Revenue",
    stage: "Seed Round",
    risk: "High Risk",
    riskColor: "text-red-400",
    analyzed: "1 month ago",
    aiScore: 5.3,
    scoreColor: "text-yellow-400",
    trend: "down",
  },
]

export default function DashboardPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Investly.ai
                </span>
              </Link>
              <div className="hidden md:block text-muted-foreground">Dashboard</div>
            </div>

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New Deck
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Investment Dashboard</h1>
          <p className="text-muted-foreground">Manage and analyze your portfolio companies with AI-powered insights</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass p-6 rounded-xl glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Companies</p>
                <p className="text-2xl font-bold text-primary">{companies.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-xl glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg AI Score</p>
                <p className="text-2xl font-bold text-green-400">6.9</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-400/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-xl glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Risk</p>
                <p className="text-2xl font-bold text-red-400">2</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-400/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-xl glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recent Analysis</p>
                <p className="text-2xl font-bold text-secondary">3</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Companies Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/dashboard/${company.id}`}>
                <div className="glass p-6 rounded-xl h-full cursor-pointer group hover:glow transition-all duration-300">
                  {/* Company Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{company.sector}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {company.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Revenue:</span>
                      <span className="font-medium">{company.arr}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stage:</span>
                      <span className="font-medium">{company.stage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Risk:</span>
                      <span className={`font-medium ${company.riskColor}`}>{company.risk}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="text-xs text-muted-foreground">Analyzed {company.analyzed}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">AI Score:</span>
                      <span className={`text-sm font-bold ${company.scoreColor}`}>{company.aiScore}/10</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Add New Company Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: companies.length * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div
              onClick={() => setIsUploadModalOpen(true)}
              className="glass p-6 rounded-xl h-full cursor-pointer group hover:glow transition-all duration-300 border-2 border-dashed border-border/50 hover:border-primary/50 flex flex-col items-center justify-center min-h-[280px]"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Add New Company</h3>
              <p className="text-sm text-muted-foreground text-center">Upload pitch deck to start AI analysis</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Upload Modal */}
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </div>
  )
}
