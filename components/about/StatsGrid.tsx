"use client"

import { Users, Building2, Globe2, Award, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { label: "Active Members", value: "50k+", icon: Users, color: "text-blue-600", bg: "bg-blue-50", desc: "Professionals trusting us" },
  { label: "Global Locations", value: "120+", icon: Globe2, color: "text-purple-600", bg: "bg-purple-50", desc: "Cities across 4 continents" },
  { label: "Enterprise Partners", value: "500+", icon: Building2, color: "text-orange-600", bg: "bg-orange-50", desc: "Fortune 500 companies" },
  { label: "Design Awards", value: "25", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50", desc: "Industry recognition" },
]

const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
}

const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } as const }
}

export function StatsGrid() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label} 
            variants={item}
            className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-start group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} mb-6 group-hover:scale-110 transition-transform duration-500 ease-out`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            
            <div className="relative z-10">
                <div className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all">
                    {stat.value}
                </div>
                <div className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.desc}</div>
            </div>

            {/* Decorative background element showing up on hover */}
            <div className={`absolute -right-4 -bottom-4 opacity-0 group-hover:opacity-10 transition-opacity duration-500`}>
                <stat.icon className={`w-32 h-32 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
