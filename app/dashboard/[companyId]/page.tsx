"use client"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Download,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users,
  Building,
  DollarSign,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { CompanyTabs } from "@/components/company-tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { generateQuickDealNotePDF } from "@/lib/pdf-generator"
import { useState } from "react"

// Mock data - in a real app this would come from an API
const getCompanyData = (id: string) => {
  const companies = {
    "techstart-inc": {
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
      description: "AI-powered customer service automation platform serving enterprise clients",
      founded: "2021",
      employees: "45-60",
      location: "San Francisco, CA",
    },
    "fintech-solutions": {
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
      description: "Next-generation digital banking platform for SMBs",
      founded: "2022",
      employees: "20-35",
      location: "New York, NY",
    },
    "healthtech-ai": {
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
      description: "AI-driven medical imaging analysis for early disease detection",
      founded: "2023",
      employees: "8-15",
      location: "Boston, MA",
    },
  }

  return companies[id as keyof typeof companies] || companies["techstart-inc"]
}

export default function CompanyDetailPage({ params }: { params: { companyId: string } }) {
  const company = getCompanyData(params.companyId)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const result = await generateQuickDealNotePDF(company)
      if (result.success) {
        console.log('PDF generated successfully:', result.fileName)
      } else {
        console.error('PDF generation failed:', result.error)
        alert('Failed to generate PDF. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="hidden md:block text-muted-foreground">Company Analysis</div>
            </div>

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
              >
                <Download className="mr-2 h-4 w-4" />
                {isGeneratingPDF ? "Generating..." : "Download Deal Note"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Header */}
      <div className="max-w-7xl mx-auto px-6 py-8" data-pdf-content>
        <motion.div
          className="glass p-8 rounded-2xl glow mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">{company.name}</h1>
                <div className="flex items-center space-x-1">
                  {company.trend === "up" ? (
                    <TrendingUp className="h-6 w-6 text-green-400" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-400" />
                  )}
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-4">{company.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Sector</p>
                    <p className="text-sm font-medium">{company.sector}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="text-sm font-medium">{company.arr}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Team Size</p>
                    <p className="text-sm font-medium">{company.employees}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Risk Level</p>
                    <p className={`text-sm font-medium ${company.riskColor}`}>{company.risk}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Score */}
            <div className="flex flex-col items-center lg:items-end space-y-4">
              <div className="text-center lg:text-right">
                <p className="text-sm text-muted-foreground mb-2">AI Investment Score</p>
                <div className="flex items-center space-x-2">
                  <Star className="h-6 w-6 text-primary" />
                  <span className={`text-4xl font-bold ${company.scoreColor}`}>{company.aiScore}</span>
                  <span className="text-2xl text-muted-foreground">/10</span>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <p className="text-xs text-muted-foreground">Analyzed {company.analyzed}</p>
                <p className="text-xs text-muted-foreground">
                  {company.stage} • Founded {company.founded}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabbed Content */}
        <CompanyTabs company={company} />
      </div>
    </div>
  )
}
