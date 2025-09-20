"use client"

import { motion } from "framer-motion"

const riskData = [
  { category: "Market Risk", score: 3, color: "bg-green-400" },
  { category: "Team Risk", score: 2, color: "bg-green-400" },
  { category: "Financial Risk", score: 4, color: "bg-yellow-400" },
  { category: "Product Risk", score: 3, color: "bg-green-400" },
  { category: "Operational Risk", score: 5, color: "bg-yellow-400" },
]

export function RiskHeatmap() {
  return (
    <div className="space-y-4">
      {riskData.map((risk, index) => (
        <motion.div
          key={risk.category}
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="w-32 text-sm font-medium">{risk.category}</div>
          <div className="flex-1 bg-muted/20 rounded-full h-3 overflow-hidden">
            <motion.div
              className={`h-full ${risk.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${(risk.score / 10) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
          <div className="w-12 text-sm text-right">{risk.score}/10</div>
        </motion.div>
      ))}
    </div>
  )
}
