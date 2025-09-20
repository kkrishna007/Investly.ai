"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  Brain,
  BarChart3,
  FileText,
  CheckCircle,
  ArrowRight,
  Loader2,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react"

const workflowSteps = [
  {
    id: 1,
    title: "Upload Documents",
    description: "Drag & drop pitch decks, financial models, and supporting docs",
    icon: Upload,
    color: "primary",
  },
  {
    id: 2,
    title: "AI Parsing",
    description: "Advanced NLP extracts key metrics, claims, and insights",
    icon: Brain,
    color: "secondary",
  },
  {
    id: 3,
    title: "Insights Extraction",
    description: "Identify ARR, TAM/SAM/SOM, team credentials, and market positioning",
    icon: BarChart3,
    color: "accent",
  },
  {
    id: 4,
    title: "Deal Note Generation",
    description: "Comprehensive analysis with risk assessment and recommendations",
    icon: FileText,
    color: "primary",
  },
]

const mockData = {
  fileName: "TechStartup_Series_A_Deck.pdf",
  insights: {
    arr: "$2.4M",
    tam: "$50B",
    sam: "$8.2B",
    som: "$420M",
    team: "Ex-Google, Stanford MBA",
    stage: "Series A",
  },
}

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [progress, setProgress] = useState(0)

  const startSimulation = async () => {
    setIsSimulating(true)
    setActiveStep(0)
    setProgress(0)

    // Simulate workflow progression
    for (let step = 0; step < workflowSteps.length; step++) {
      setActiveStep(step)

      // Simulate processing time for each step
      const stepDuration = step === 1 ? 3000 : 2000 // AI parsing takes longer
      const progressIncrement = 100 / workflowSteps.length

      for (let i = 0; i <= 100; i += 5) {
        await new Promise((resolve) => setTimeout(resolve, stepDuration / 20))
        setProgress(step * progressIncrement + (i * progressIncrement) / 100)
      }
    }

    setIsSimulating(false)
  }

  return (
    <section className="py-24 px-6">
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
            From Upload to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Insights</span>{" "}
            in Minutes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Watch our AI transform complex pitch documents into actionable investment intelligence
          </p>
        </motion.div>

        {/* Workflow timeline */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Steps */}
          <div className="space-y-6">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === index
              const isCompleted = activeStep > index

              return (
                <motion.div
                  key={step.id}
                  className={`flex items-start space-x-4 p-6 rounded-xl transition-all duration-500 ${
                    isActive
                      ? "glass glow border-l-4 border-l-primary"
                      : isCompleted
                        ? "glass border-l-4 border-l-accent"
                        : "bg-muted/20 border border-border/30"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-accent text-accent-foreground"
                        : isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <Icon className={`h-6 w-6 ${isActive && isSimulating ? "animate-pulse" : ""}`} />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

                    {isActive && isSimulating && (
                      <motion.div className="mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex items-center space-x-2 text-sm text-primary">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Processing...</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right side - Simulation */}
          <div className="space-y-6">
            {/* Progress bar */}
            <motion.div
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Analysis Progress</h3>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </motion.div>

            {/* Mock file upload */}
            <motion.div
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  {isSimulating ? `Processing: ${mockData.fileName}` : "Drop your pitch deck here"}
                </p>
                <Button onClick={startSimulation} disabled={isSimulating} className="bg-primary hover:bg-primary/90">
                  {isSimulating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Start Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>

            {/* Extracted insights */}
            <AnimatePresence>
              {activeStep >= 2 && (
                <motion.div
                  className="glass p-6 rounded-xl glow-accent"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="font-semibold mb-4 flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-accent" />
                    Key Insights Extracted
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm">ARR: {mockData.insights.arr}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-secondary" />
                        <span className="text-sm">TAM: {mockData.insights.tam}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-accent" />
                        <span className="text-sm">Team: {mockData.insights.team}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm">SAM: {mockData.insights.sam}</div>
                      <div className="text-sm">SOM: {mockData.insights.som}</div>
                      <div className="text-sm">Stage: {mockData.insights.stage}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final result */}
            <AnimatePresence>
              {activeStep >= 3 && !isSimulating && (
                <motion.div
                  className="glass p-6 rounded-xl glow border-l-4 border-l-accent"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-accent" />
                        Deal Note Complete
                      </h3>
                      <p className="text-sm text-muted-foreground">Comprehensive analysis with risk assessment ready</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Report
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
