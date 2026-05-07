"use client"

import { motion } from "framer-motion"
import { Check, Wifi, Coffee, Printer, Zap, Car, ShieldCheck } from "lucide-react"
import { useState, useEffect } from "react"
import { memberApi } from "@/lib/api"
import ImageWithFallback from "@/components/ui/ImageWithFallback"

export function PremiumPlans() {
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await memberApi.getTopPlans()
        setPlans(res.data.data)
      } catch (error) {
        console.error("Failed to fetch top plans:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

  if (loading) {
      return (
          <div className="py-24 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">Loading premium plans...</p>
          </div>
      )
  }

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
            <a href="/explore" className="text-blue-600 font-bold hover:text-blue-700 transition-colors flex items-center gap-2 group">
                View all plans
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => {
            let images: string[] = []
            let features: string[] = []

            try {
                images = plan.images ? (typeof plan.images === 'string' ? JSON.parse(plan.images) : plan.images) : []
            } catch (e) {
                console.error("Failed to parse images for plan:", plan.recId)
            }

            try {
                features = plan.features ? (typeof plan.features === 'string' ? JSON.parse(plan.features) : plan.features) : []
            } catch (e) {
                console.error("Failed to parse features for plan:", plan.recId)
            }

            const displayImage = Array.isArray(images) && images.length > 0 ? images[0] : null

            return (
              <motion.div
                key={plan.recId}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                className="glass-card rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-all duration-500 group flex flex-col h-full border border-gray-100/50"
              >
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <ImageWithFallback 
                    src={displayImage} 
                    alt={plan.name} 
                    fill
                    className="group-hover:scale-105 transition-transform duration-700 will-change-transform" 
                  />
                  <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <span className="bg-white/90 backdrop-blur text-blue-800 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm tracking-wider uppercase">
                      {plan.durationType || "PREMIUM"}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 z-20 text-white">
                      <p className="text-2xl font-bold tracking-tight">Rs {plan.price}/{plan.durationType || 'day'}</p>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow bg-white/40 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{plan.name}</h3>
                  
                  <div className="space-y-4 mb-8 flex-grow">
                    {(Array.isArray(features) ? features : []).slice(0, 3).map((feature: string) => (
                      <div key={feature} className="flex items-center text-sm text-gray-600 group/item">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 group-hover/item:bg-blue-100 transition-colors">
                          <ShieldCheck className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium">{feature}</span>
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
