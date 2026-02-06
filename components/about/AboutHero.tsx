"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function AboutHero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as const }
  }

  return (
    <section className="relative pt-32 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col lg:flex-row gap-16 items-center"
        >
            <div className="flex-1 text-left">
                <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"/>
                    <span className="text-xs font-bold text-gray-900 tracking-wide uppercase">Reimagining Work</span>
                </motion.div>
                
                <motion.h1 variants={item} className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-[1.1]">
                  Where ideas <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
                    find their space.
                  </span>
                </motion.h1>
                
                <motion.p variants={item} className="text-xl text-gray-500 max-w-xl mb-10 leading-relaxed font-medium">
                  We&apos;re building the operating system for the hybrid world. A seamless network of premium workspaces designed to inspire your best work, wherever you are.
                </motion.p>

                <motion.div variants={item} className="flex gap-4">
                    <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95">
                        Our Manifest
                    </button>
                     <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all hover:border-gray-300">
                        Meet the Team
                    </button>
                </motion.div>
            </div>
            
            {/* Hero Image / Collage */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" } as const}
              className="flex-1 relative"
            >
                 <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/20 rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
                    <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop" 
                    alt="Office space" 
                    className="w-full h-[600px] object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                    />
                    {/* Glass Overlay Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 text-white"
                    >
                        <div className="text-3xl font-bold mb-1">500+</div>
                        <div className="text-sm font-medium text-white/80">Enterprise partners trusting us</div>
                    </motion.div>
                 </div>
                 
                 {/* Decorative elements */}
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-50" />
                 <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50" />
            </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
      >
          <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  )
}
