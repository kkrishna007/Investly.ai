"use client"

import { motion } from "framer-motion"
import { Link2, Shield, Users, BarChart3, AlertTriangle, Download, Zap, Target, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const features = [
  {
    title: "Evidence-Linked Insights",
    description: "Every claim and metric is traced back to specific document sources with clickable references.",
    icon: Link2,
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    title: "Cross-Doc Consistency Checks",
    description: "Automatically identify discrepancies between pitch deck, financials, and supporting materials.",
    icon: Shield,
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    title: "Founder Credibility Analysis",
    description: "Deep dive into team backgrounds, previous exits, and red flags from public records.",
    icon: Users,
    color: "accent",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    title: "Sector Benchmarking",
    description: "Compare key metrics against industry standards and similar-stage companies in real-time.",
    icon: BarChart3,
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    title: "Risk Heatmap",
    description: "Visual risk assessment across market, team, financial, product, and operational dimensions.",
    icon: AlertTriangle,
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    title: "One-Click Export",
    description: "Generate professional PDF reports, executive summaries, and presentation-ready slides instantly.",
    icon: Download,
    color: "accent",
    gradient: "from-accent/20 to-accent/5",
  },
]

const stats = [
  { value: "10x", label: "Faster Analysis", icon: Zap },
  { value: "95%", label: "Accuracy Rate", icon: Target },
  { value: "500+", label: "Deals Analyzed", icon: CheckCircle2 },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
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
            Powered by{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Advanced AI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Our proprietary algorithms deliver institutional-grade analysis with the speed and precision that modern
            investors demand
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="glass p-6 rounded-xl text-center glow">
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="glass p-8 rounded-xl h-full relative overflow-hidden transition-all duration-300 group-hover:glow">
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-6 w-6 text-${feature.color}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>

                    {/* Hover effect indicator */}
                    <motion.div
                      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">Ready to transform your investment analysis?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <motion.button
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold glow hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Go to Dashboard
              </motion.button>
            </Link>
            <motion.button
              className="px-8 py-3 border border-border/50 rounded-lg font-semibold hover:border-secondary/50 hover:bg-secondary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
