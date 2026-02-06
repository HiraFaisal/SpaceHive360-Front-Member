"use client"

import { motion } from "framer-motion"
import { Search, MapPin, Users, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function Hero() {
  const router = useRouter()
  const [location, setLocation] = useState("New York, NY")
  const [type, setType] = useState("Hot Desk")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (type) params.append("type", type)
    router.push(`/explore?${params.toString()}`)
  }

  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[100px] animate-blob mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-100/20 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
                <Sparkles className="w-3 h-3" />
                <span>AI-Powered Workspace Finder</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-8">
              Your <br/>
              Workspace, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 animate-gradient-x">
                Reimagined
              </span>
            </h1>
            <p className="text-lg text-gray-600/90 mb-10 leading-relaxed max-w-lg font-medium">
              The ultimate 360° ecosystem for flexible teams. Discover, book, and thrive in premium coworking spaces curated by AI.
            </p>

            {/* AI Command Center Search Bar */}
            <div className="bg-white p-2 rounded-2xl flex flex-col sm:flex-row gap-2 max-w-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 relative z-20">
              <div className="flex-1 flex items-center px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
                <MapPin className="text-blue-600 w-5 h-5 mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where do you want to work?" 
                  className="w-full outline-none text-gray-900 placeholder-gray-400 text-sm font-medium bg-transparent"
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-3">
                <Users className="text-blue-600 w-5 h-5 mr-3 flex-shrink-0" />
                 <div className="relative w-full">
                    <select 
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full outline-none text-gray-900 bg-transparent text-sm font-medium cursor-pointer appearance-none py-1"
                    >
                        <option value="Hot Desk">Hot Desk</option>
                        <option value="Private Office">Private Office</option>
                        <option value="Meeting Room">Meeting Room</option>
                    </select>
                    {/* Custom chevron for better UI */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                 </div>
              </div>
              <button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Find</span>
              </button>
            </div>
          </motion.div>

          {/* Image & Floating Cards Composition */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             className="relative hidden lg:block h-[600px] w-full"
          >
            {/* Background Decorative Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-[100px] -z-10" />

            {/* Image 1: Main Large Image (Back/Left) */}
            <div className="absolute top-0 left-4 w-2/3 h-3/4 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-700 z-10">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Image 2: Secondary Image (Front/Right) */}
            <div className="absolute bottom-12 right-0 w-3/5 h-3/5 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-6 hover:rotate-0 transition-transform duration-700 z-20">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=2340&auto=format&fit=crop')] bg-cover bg-center" />
            </div>

            {/* Floating "Booking Confirmed" Card (Overlapping both) */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              className="glass absolute top-1/2 left-1/4 -translate-y-1/2 p-4 rounded-xl z-30 flex gap-4 items-center min-w-[200px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/60 backdrop-blur-md bg-white/80"
            >
                <div className="relative">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckIcon className="w-3 h-3 text-white" />
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-sm">Booking Confirmed</h3>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">The Hive, Downtown</p>
                </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
}
