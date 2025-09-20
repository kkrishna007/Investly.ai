"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, Play, Twitter, Linkedin } from "lucide-react"


export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border/30 bg-gradient-to-t from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  InvestIQ
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                AI-powered investment analysis platform that transforms pitch documents into actionable insights. Built
                for modern investors who demand speed, accuracy, and transparency.
              </p>

              {/* Demo links */}
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#github"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Repo</span>
                </motion.a>
                <motion.a
                  href="#video"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <Play className="h-4 w-4" />
                  <span>Demo Video</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Links sections */}
        </div>

        {/* Bottom section */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between pt-8 border-t border-border/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">© 2025 InvestIQ. Built for hackathon demonstration.</p>
          </div>

        </motion.div>
      </div>
    </footer>
  )
}
