"use client"

import { motion } from "framer-motion"

export function CTA() {
  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-[3rem] p-12 md:p-32 text-center overflow-hidden relative shadow-2xl shadow-blue-900/30"
        >
          {/* Animated Background Shapes */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
              Ready to find your focus?
            </h2>
            <p className="text-blue-100 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium">
              Join 50,000+ professionals and teams who are revolutionizing where they work.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-5 bg-white text-blue-700 text-lg font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95">
                Get Started Free
              </button>
              <button className="px-10 py-5 bg-white/10 text-white text-lg font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-md">
                Contact Sales
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
