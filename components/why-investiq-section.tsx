"use client"

import { motion } from "framer-motion"
import { Link2, AlertTriangle, BarChart3, Zap, Shield } from "lucide-react"

const usps = [
  {
    title: "Evidence-Linked Scoring",
    description:
      "Every metric and claim is traced back to specific document sources, ensuring transparency and accountability in your investment decisions.",
    icon: Link2,
    color: "primary",
  },
  {
    title: "Founder Red-Flag Detection",
    description:
      "Advanced algorithms scan public records, social media, and professional networks to identify potential founder credibility issues before they become problems.",
    icon: AlertTriangle,
    color: "secondary",
  },
  {
    title: "Benchmarking at Scale",
    description:
      "Compare startups against thousands of similar companies in our database, with real-time market data and industry-specific metrics.",
    icon: BarChart3,
    color: "accent",
  },
]

export function WhyInvestIQSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animated-gradient opacity-50" />

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-secondary/5 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              InvestIQ?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Built by investors, for investors. Our platform combines institutional-grade analysis with cutting-edge AI
            to deliver insights you can trust.
          </p>
        </motion.div>

        {/* USPs Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {usps.map((usp, index) => {
            const Icon = usp.icon
            return (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="glass p-8 rounded-2xl h-full text-center group-hover:glow transition-all duration-300">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-${usp.color}/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className={`h-8 w-8 text-${usp.color}`} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    {usp.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{usp.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats section */}
        <motion.div
          className="glass rounded-2xl p-8 glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <motion.div
                className="text-3xl font-bold text-primary mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                500+
              </motion.div>
              <div className="text-sm text-muted-foreground">Deals Analyzed</div>
            </div>
            <div>
              <motion.div
                className="text-3xl font-bold text-secondary mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                95%
              </motion.div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div>
              <motion.div
                className="text-3xl font-bold text-accent mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                10x
              </motion.div>
              <div className="text-sm text-muted-foreground">Faster Analysis</div>
            </div>
            <div>
              <motion.div
                className="text-3xl font-bold text-primary mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                $2B+
              </motion.div>
              <div className="text-sm text-muted-foreground">Assets Under Analysis</div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to revolutionize your deal flow?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join leading VCs and angel investors who trust InvestIQ to accelerate their investment decisions with
            AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold glow hover:bg-primary/90 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Free Trial
            </motion.button>
            <motion.button
              className="px-8 py-4 border border-border/50 rounded-lg font-semibold hover:border-secondary/50 hover:bg-secondary/10 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="mr-2 h-5 w-5" />
              Enterprise Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
