"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Zap, Globe2, CreditCard } from "lucide-react"

export function ValueProps() {
  return (
    <section className="py-24 relative overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Floating Cards Grid (Left side in design) */}
          <div className="relative">
             <div className="grid grid-cols-2 gap-6">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6 mt-12"
                >
                    <div className="glass-card p-6 rounded-[2rem] hover:border-blue-200 transition-colors group">
                        <div className="w-12 h-12 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Instant Book</h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Skip the paperwork. Book a desk in under 60 seconds.</p>
                    </div>
                    <div className="glass-card p-6 rounded-[2rem] hover:border-cyan-200 transition-colors group">
                        <div className="w-12 h-12 bg-cyan-100/50 rounded-2xl flex items-center justify-center mb-4 text-cyan-600 group-hover:scale-110 transition-transform">
                            <Globe2 className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Global Access</h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">One membership, 500+ locations across 60 countries.</p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                     <div className="glass-card p-6 rounded-[2rem] hover:border-purple-200 transition-colors group">
                        <div className="w-12 h-12 bg-purple-100/50 rounded-2xl flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Smart Picks</h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">AI matches you to workspaces for your specific workflow.</p>
                    </div>
                    <div className="glass-card p-6 rounded-[2rem] hover:border-green-200 transition-colors group">
                        <div className="w-12 h-12 bg-green-100/50 rounded-2xl flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Verified</h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Every space is hand-checked for quality and amenities.</p>
                    </div>
                </motion.div>
             </div>
          </div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-12"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
              Why professionals choose SpaceHive 360
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
              We don't just list offices; we curate ecosystems where businesses grow and individuals flourish.
            </p>

            <div className="space-y-6">
                {[
                    { title: "Trusted community events & networking", icon: Users2Comp },
                    { title: "Centralized billing for remote teams", icon: CreditCard },
                    { title: "No hidden fees or long-term contracts", icon: ShieldCheck },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-5 group cursor-default">
                         <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                             <CheckIcon className="w-5 h-5" />
                         </div>
                         <span className="text-gray-900 font-bold text-lg">{item.title}</span>
                    </div>
                ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function Users2Comp(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
}
