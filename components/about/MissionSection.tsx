"use client"

import { CheckCircle2, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function MissionSection() {
  return (
    <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <motion.div 
         initial={{ opacity: 0, y: 40 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.8 }}
         className="bg-white rounded-[3rem] p-8 md:p-20 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden"
       >
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="order-2 lg:order-1">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-8"
                >
                    Our Mission
                </motion.div>
                <h2 className="text-3xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
                    Making space for <br/>
                    <span className="text-blue-600">what matters.</span>
                </h2>
                <div className="space-y-8 text-lg text-gray-500 font-medium leading-relaxed">
                    <p>
                        The way we work has changed forever. The 9-to-5 cubicle farm is dead. Today&apos;s workforce needs flexibility, inspiration, and community.
                    </p>
                    <p>
                        We built SpaceHive 360 to bridge the gap between remote freedom and physical connection. We believe that when you put brilliant people in beautiful spaces, magic happens.
                    </p>
                </div>

                <div className="mt-10 space-y-4">
                    {["Premium workspaces on demand", "AI-powered matching", "Community-first philosophy"].map((item, i) => (
                        <motion.div 
                            key={item} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="flex items-center gap-4 group cursor-pointer"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-gray-700 text-base group-hover:text-gray-900 transition-colors">{item}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="order-1 lg:order-2 relative">
                 <div className="grid grid-cols-2 gap-6 relative">
                    <motion.img 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        src="https://images.unsplash.com/photo-1497215842964-222b4bef9728?q=80&w=2340&auto=format&fit=crop" 
                        className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl transform translate-y-12 z-10" 
                    />
                    <motion.img 
                        initial={{ opacity: 0, y: -40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=2340&auto=format&fit=crop" 
                        className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl z-0" 
                    />
                 </div>
                 
                 {/* Floating Badge */}
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/50 text-center z-20"
                 >
                    <div className="text-4xl font-extrabold text-blue-600 mb-1">4.9</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">Average Rating</div>
                    <div className="flex gap-1 justify-center mt-2">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-400" />)}
                    </div>
                 </motion.div>
            </div>
          </div>
       </motion.div>
    </section>
  )
}
