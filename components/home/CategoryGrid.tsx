"use client"

import { motion } from "framer-motion"
import { Laptop, Building2, Presentation, MapPin, ArrowRight, ArrowLeft } from "lucide-react"

const categories = [
  {
    title: "Hot Desks",
    description: "Flexible seating for individuals and digital nomads.",
    icon: Laptop,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
  },
  {
    title: "Private Offices",
    description: "Secure, quiet space for growing teams and startups.",
    icon: Building2,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-200",
  },
  {
    title: "Meeting Rooms",
    description: "Professional spaces for collaborative workshops.",
    icon: Presentation,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "group-hover:border-orange-200",
  },
  {
    title: "Virtual Offices",
    description: "Prestigious business addr for remote brands.",
    icon: MapPin,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "group-hover:border-cyan-200",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow for this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-blue-100/20 blur-[100px] -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 pl-1">Explore Categories</h2>
            <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">Tailored to your needs</h3>
          </div>
          <div className="hidden sm:flex gap-3">
            <button className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all hover:scale-105 active:scale-95 shadow-sm">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all hover:scale-105 active:scale-95 shadow-sm">
                <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`group relative p-8 rounded-3xl bg-white border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/5 cursor-pointer ${cat.border}`}
            >
              
              <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                 <cat.icon className="w-7 h-7" />
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{cat.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600">
                {cat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
