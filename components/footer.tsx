"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, Play, Twitter, Linkedin } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "API", href: "#api" },
    { name: "Documentation", href: "#docs" },
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" },
  ],
  resources: [
    { name: "Help Center", href: "#help" },
    { name: "Community", href: "#community" },
    { name: "Status", href: "#status" },
    { name: "Security", href: "#security" },
  ],
}

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#github" },
  { name: "Twitter", icon: Twitter, href: "#twitter" },
  { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
]

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
                  href="#prototype"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-secondary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Prototype</span>
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
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
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
            <p className="text-sm text-muted-foreground">© 2024 InvestIQ. Built for hackathon demonstration.</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#privacy" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#terms" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#cookies" className="hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
