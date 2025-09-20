"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Building,
  GraduationCap,
  Award,
  ExternalLink,
  Search,
  Clock,
  Shield,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FounderProfile {
  id: string
  name: string
  role: string
  photo?: string
  overallScore: number
  riskLevel: "Low" | "Medium" | "High"
  background: {
    experience: Array<{
      company: string
      role: string
      duration: string
      verified: boolean
      exitValue?: string
    }>
    education: Array<{
      institution: string
      degree: string
      year: string
      verified: boolean
    }>
    achievements: Array<{
      title: string
      description: string
      verified: boolean
    }>
  }
  redFlags: Array<{
    type: "Employment Gap" | "Job Hopping" | "Failed Startup" | "Legal Issue" | "Inconsistent Claims"
    severity: "High" | "Medium" | "Low"
    description: string
    details: string
    verified: boolean
  }>
  positiveSignals: Array<{
    type: "Successful Exit" | "Domain Expertise" | "Strong Network" | "Thought Leadership" | "Technical Skills"
    description: string
    impact: "High" | "Medium" | "Low"
  }>
  socialProof: {
    linkedinConnections: number
    twitterFollowers: number
    githubContributions?: number
    mediaAppearances: number
    patents: number
  }
  verification: {
    identityVerified: boolean
    backgroundCheckComplete: boolean
    referencesContacted: number
    lastUpdated: string
  }
}

interface CredibilityReport {
  overallTeamScore: number
  totalFounders: number
  highRiskFounders: number
  verificationComplete: boolean
  founders: FounderProfile[]
}

const mockCredibilityData: CredibilityReport = {
  overallTeamScore: 8.4,
  totalFounders: 2,
  highRiskFounders: 0,
  verificationComplete: true,
  founders: [
    {
      id: "1",
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      overallScore: 9.2,
      riskLevel: "Low",
      background: {
        experience: [
          {
            company: "Stripe",
            role: "VP Engineering",
            duration: "2019-2023",
            verified: true,
            exitValue: "IPO",
          },
          {
            company: "Google",
            role: "Senior Software Engineer",
            duration: "2016-2019",
            verified: true,
          },
          {
            company: "Microsoft",
            role: "Software Engineer",
            duration: "2014-2016",
            verified: true,
          },
        ],
        education: [
          {
            institution: "Stanford University",
            degree: "MS Computer Science",
            year: "2014",
            verified: true,
          },
          {
            institution: "UC Berkeley",
            degree: "BS Computer Science",
            year: "2012",
            verified: true,
          },
        ],
        achievements: [
          {
            title: "Led Stripe's Infrastructure Team",
            description: "Scaled payment processing to handle $100B+ annually",
            verified: true,
          },
          {
            title: "Published Research",
            description: "3 papers on distributed systems at top-tier conferences",
            verified: true,
          },
        ],
      },
      redFlags: [],
      positiveSignals: [
        {
          type: "Successful Exit",
          description: "Part of Stripe's leadership during IPO preparation",
          impact: "High",
        },
        {
          type: "Domain Expertise",
          description: "8+ years in fintech and payment systems",
          impact: "High",
        },
        {
          type: "Strong Network",
          description: "Connected to top-tier VCs and tech executives",
          impact: "Medium",
        },
      ],
      socialProof: {
        linkedinConnections: 2500,
        twitterFollowers: 8500,
        githubContributions: 1200,
        mediaAppearances: 15,
        patents: 2,
      },
      verification: {
        identityVerified: true,
        backgroundCheckComplete: true,
        referencesContacted: 3,
        lastUpdated: "2024-01-15",
      },
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      overallScore: 7.6,
      riskLevel: "Low",
      background: {
        experience: [
          {
            company: "Meta",
            role: "Staff Software Engineer",
            duration: "2020-2023",
            verified: true,
          },
          {
            company: "Uber",
            role: "Senior Software Engineer",
            duration: "2018-2020",
            verified: true,
          },
          {
            company: "Airbnb",
            role: "Software Engineer",
            duration: "2016-2018",
            verified: true,
          },
        ],
        education: [
          {
            institution: "MIT",
            degree: "PhD Computer Science",
            year: "2016",
            verified: true,
          },
          {
            institution: "Carnegie Mellon",
            degree: "BS Computer Science",
            year: "2012",
            verified: true,
          },
        ],
        achievements: [
          {
            title: "Led ML Infrastructure at Meta",
            description: "Built systems serving 3B+ users daily",
            verified: true,
          },
          {
            title: "Open Source Contributor",
            description: "Core contributor to TensorFlow and PyTorch",
            verified: true,
          },
        ],
      },
      redFlags: [
        {
          type: "Job Hopping",
          severity: "Low",
          description: "3 jobs in 7 years",
          details: "Pattern of 2-year tenures, but all at top-tier companies with clear progression",
          verified: true,
        },
      ],
      positiveSignals: [
        {
          type: "Technical Skills",
          description: "Deep expertise in ML and distributed systems",
          impact: "High",
        },
        {
          type: "Domain Expertise",
          description: "7+ years building scalable systems at unicorns",
          impact: "High",
        },
        {
          type: "Thought Leadership",
          description: "Regular speaker at ML conferences",
          impact: "Medium",
        },
      ],
      socialProof: {
        linkedinConnections: 1800,
        twitterFollowers: 4200,
        githubContributions: 2800,
        mediaAppearances: 8,
        patents: 1,
      },
      verification: {
        identityVerified: true,
        backgroundCheckComplete: true,
        referencesContacted: 2,
        lastUpdated: "2024-01-15",
      },
    },
  ],
}

export function FounderCredibilitySystem() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedFounder, setSelectedFounder] = useState<string | null>(null)
  const data = mockCredibilityData

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "text-green-400"
    if (score >= 7.0) return "text-yellow-400"
    if (score >= 5.0) return "text-orange-400"
    return "text-red-400"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-400 border-green-400/50 bg-green-400/10"
      case "Medium":
        return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10"
      case "High":
        return "text-red-400 border-red-400/50 bg-red-400/10"
      default:
        return "text-muted-foreground border-border/50"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "text-red-400 border-red-400/50"
      case "Medium":
        return "text-yellow-400 border-yellow-400/50"
      case "Low":
        return "text-blue-400 border-blue-400/50"
      default:
        return "text-muted-foreground border-border/50"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-green-400 border-green-400/50"
      case "Medium":
        return "text-yellow-400 border-yellow-400/50"
      case "Low":
        return "text-blue-400 border-blue-400/50"
      default:
        return "text-muted-foreground border-border/50"
    }
  }

  return (
    <Card className="glass glow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Founder Credibility Analysis</span>
          </div>
          <Badge variant="outline" className={`${getScoreColor(data.overallTeamScore)} border-current`}>
            {data.overallTeamScore}/10 Team Score
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Team Overview</TabsTrigger>
            <TabsTrigger value="individual">Individual Analysis</TabsTrigger>
            <TabsTrigger value="verification">Verification Status</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Team Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className={`text-2xl font-bold ${getScoreColor(data.overallTeamScore)}`}>
                  {data.overallTeamScore}
                </div>
                <div className="text-xs text-muted-foreground">Team Score</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">{data.totalFounders}</div>
                <div className="text-xs text-muted-foreground">Founders</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{data.highRiskFounders}</div>
                <div className="text-xs text-muted-foreground">High Risk</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{data.verificationComplete ? "✓" : "⏳"}</div>
                <div className="text-xs text-muted-foreground">Verification</div>
              </div>
            </div>

            {/* Founder Cards */}
            <div className="space-y-4">
              <h3 className="font-semibold">Founder Profiles</h3>
              <div className="grid gap-4">
                {data.founders.map((founder, index) => (
                  <motion.div
                    key={founder.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-border/50 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{founder.name}</h4>
                          <p className="text-primary font-medium">{founder.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(founder.overallScore)}`}>
                          {founder.overallScore}
                        </div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Experience</p>
                        <p className="font-medium">{founder.background.experience.length} positions</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Education</p>
                        <p className="font-medium">{founder.background.education.length} degrees</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                        <Badge variant="outline" className={getRiskColor(founder.riskLevel)}>
                          {founder.riskLevel}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm">{founder.positiveSignals.length} Positive Signals</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {founder.redFlags.length === 0 ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          )}
                          <span className="text-sm">{founder.redFlags.length} Red Flags</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedFounder(founder.id)
                          setActiveTab("individual")
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div className="space-y-4">
              <h3 className="font-semibold">Key Team Insights</h3>
              <div className="grid gap-3">
                <div className="flex items-start space-x-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Exceptional Technical Leadership</p>
                    <p className="text-sm text-muted-foreground">
                      Both founders have extensive experience at top-tier tech companies with proven track records
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Complementary Skill Sets</p>
                    <p className="text-sm text-muted-foreground">
                      CEO brings business and scaling experience, CTO provides deep technical expertise
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Limited Startup Experience</p>
                    <p className="text-sm text-muted-foreground">
                      Both founders come from large companies; first-time entrepreneurs in startup environment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="individual" className="space-y-6 mt-6">
            {/* Founder Selection */}
            <div className="flex items-center space-x-4">
              <label className="font-medium">Select Founder:</label>
              <select
                value={selectedFounder || ""}
                onChange={(e) => setSelectedFounder(e.target.value)}
                className="bg-background border border-border/50 rounded px-3 py-2"
              >
                <option value="">Choose a founder...</option>
                {data.founders.map((founder) => (
                  <option key={founder.id} value={founder.id}>
                    {founder.name} - {founder.role}
                  </option>
                ))}
              </select>
            </div>

            {selectedFounder && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {(() => {
                  const founder = data.founders.find((f) => f.id === selectedFounder)!
                  return (
                    <>
                      {/* Founder Header */}
                      <div className="flex items-center justify-between p-6 bg-muted/20 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{founder.name}</h3>
                            <p className="text-primary font-medium">{founder.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${getScoreColor(founder.overallScore)}`}>
                            {founder.overallScore}
                          </div>
                          <Badge variant="outline" className={getRiskColor(founder.riskLevel)}>
                            {founder.riskLevel} Risk
                          </Badge>
                        </div>
                      </div>

                      {/* Experience */}
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center">
                          <Building className="h-5 w-5 mr-2 text-primary" />
                          Professional Experience
                        </h4>
                        <div className="space-y-3">
                          {founder.background.experience.map((exp, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                              <div>
                                <p className="font-medium">{exp.role}</p>
                                <p className="text-sm text-muted-foreground">
                                  {exp.company} • {exp.duration}
                                </p>
                                {exp.exitValue && (
                                  <Badge variant="outline" className="text-green-400 border-green-400/50 mt-1">
                                    {exp.exitValue}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {exp.verified ? (
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                ) : (
                                  <Clock className="h-4 w-4 text-yellow-400" />
                                )}
                                <Button size="sm" variant="ghost">
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center">
                          <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                          Education
                        </h4>
                        <div className="space-y-3">
                          {founder.background.education.map((edu, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                              <div>
                                <p className="font-medium">{edu.degree}</p>
                                <p className="text-sm text-muted-foreground">
                                  {edu.institution} • {edu.year}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {edu.verified ? (
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                ) : (
                                  <Clock className="h-4 w-4 text-yellow-400" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Red Flags */}
                      {founder.redFlags.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                            Red Flags ({founder.redFlags.length})
                          </h4>
                          <div className="space-y-3">
                            {founder.redFlags.map((flag, idx) => (
                              <div key={idx} className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-medium text-red-400">{flag.type}</h5>
                                  <Badge variant="outline" className={getSeverityColor(flag.severity)}>
                                    {flag.severity}
                                  </Badge>
                                </div>
                                <p className="text-sm mb-2">{flag.description}</p>
                                <p className="text-xs text-muted-foreground">{flag.details}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Positive Signals */}
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center">
                          <Award className="h-5 w-5 mr-2 text-green-400" />
                          Positive Signals ({founder.positiveSignals.length})
                        </h4>
                        <div className="space-y-3">
                          {founder.positiveSignals.map((signal, idx) => (
                            <div key={idx} className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-green-400">{signal.type}</h5>
                                <Badge variant="outline" className={getImpactColor(signal.impact)}>
                                  {signal.impact} Impact
                                </Badge>
                              </div>
                              <p className="text-sm">{signal.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Social Proof */}
                      <div>
                        <h4 className="font-semibold mb-4">Social Proof & Network</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="text-center p-3 bg-muted/20 rounded-lg">
                            <div className="text-lg font-bold text-primary">
                              {founder.socialProof.linkedinConnections}
                            </div>
                            <div className="text-xs text-muted-foreground">LinkedIn</div>
                          </div>
                          <div className="text-center p-3 bg-muted/20 rounded-lg">
                            <div className="text-lg font-bold text-primary">{founder.socialProof.twitterFollowers}</div>
                            <div className="text-xs text-muted-foreground">Twitter</div>
                          </div>
                          {founder.socialProof.githubContributions && (
                            <div className="text-center p-3 bg-muted/20 rounded-lg">
                              <div className="text-lg font-bold text-primary">
                                {founder.socialProof.githubContributions}
                              </div>
                              <div className="text-xs text-muted-foreground">GitHub</div>
                            </div>
                          )}
                          <div className="text-center p-3 bg-muted/20 rounded-lg">
                            <div className="text-lg font-bold text-primary">{founder.socialProof.mediaAppearances}</div>
                            <div className="text-xs text-muted-foreground">Media</div>
                          </div>
                          <div className="text-center p-3 bg-muted/20 rounded-lg">
                            <div className="text-lg font-bold text-primary">{founder.socialProof.patents}</div>
                            <div className="text-xs text-muted-foreground">Patents</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="verification" className="space-y-6 mt-6">
            <div>
              <h3 className="font-semibold mb-4">Verification Status</h3>
              <div className="space-y-4">
                {data.founders.map((founder, index) => (
                  <div key={founder.id} className="border border-border/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">{founder.name}</h4>
                      <Badge
                        variant="outline"
                        className={
                          founder.verification.backgroundCheckComplete
                            ? "text-green-400 border-green-400/50"
                            : "text-yellow-400 border-yellow-400/50"
                        }
                      >
                        {founder.verification.backgroundCheckComplete ? "Complete" : "In Progress"}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Identity Verification</span>
                          {founder.verification.identityVerified ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Background Check</span>
                          {founder.verification.backgroundCheckComplete ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <Clock className="h-4 w-4 text-yellow-400" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">References Contacted</span>
                          <span className="text-sm font-medium">{founder.verification.referencesContacted}/3</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Last Updated</span>
                          <span className="text-sm font-medium">{founder.verification.lastUpdated}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Data Sources</span>
                          <span className="text-sm font-medium">LinkedIn, Crunchbase, News</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Confidence Level</span>
                          <Badge variant="outline" className="text-green-400 border-green-400/50">
                            High
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-6 border-t border-border/50">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Search className="h-4 w-4 mr-2" />
            Deep Background Check
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Sources
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Clock className="h-4 w-4 mr-2" />
            Schedule Update
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
