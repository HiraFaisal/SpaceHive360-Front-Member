"use client"

import { motion } from "framer-motion"
import { Check, Wifi, Coffee, Printer, Zap, Car } from "lucide-react"

const plans = [
  {
    title: "The Zenith Suite",
    badges: ["RECOMMENDED"],
    price: "$50/day",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2301&auto=format&fit=crop",
    features: [
      { name: "Fiber optic internet", icon: Wifi },
      { name: "Unlimited Artisan Coffee", icon: Coffee },
      { name: "24/7 Building Access", icon: Zap },
    ],
  },
  {
    title: "Orbit Shared Hub",
    badges: [],
    price: "$25/day",
    image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2340&auto=format&fit=crop",
    features: [
      { name: "Community Events", icon: Check },
      { name: "Unfixed Hot Desk", icon: Check },
      { name: "In-house Printing", icon: Printer },
    ],
  },
  {
    title: "The Nexus Lounge",
    badges: ["POPULAR"],
    price: "$15/hr",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2340&auto=format&fit=crop",
    features: [
      { name: "Quiet Zones", icon: Check },
      { name: "High-Speed Charging", icon: Zap },
      { name: "Free Daily Parking", icon: Car },
    ],
  },
]

export function PremiumPlans() {
  return (
    <section className="py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Featured Premium Plans</h2>
                <p className="text-gray-500 max-w-lg">Unlock exclusive access to top-tier workspaces curated for productivity and comfort.</p>
            </div>
            <button className="text-blue-600 font-bold hover:text-blue-700 transition-colors flex items-center gap-2 group">
                View all plans
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              className="glass-card rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-all duration-500 group flex flex-col h-full border border-gray-100/50"
            >
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <img 
                  src={plan.image} 
                  alt={plan.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform" 
                />
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                  {plan.badges.map(badge => (
                    <span key={badge} className="bg-white/90 backdrop-blur text-blue-800 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm tracking-wider">
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-5 left-5 z-20 text-white">
                    <p className="text-2xl font-bold tracking-tight">{plan.price}</p>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow bg-white/40 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{plan.title}</h3>
                
                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <div key={feature.name} className="flex items-center text-sm text-gray-600 group/item">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 group-hover/item:bg-blue-100 transition-colors">
                        <feature.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{feature.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                    <button className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex justify-center items-center group">
                    <span>Book Now</span>
                    </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
