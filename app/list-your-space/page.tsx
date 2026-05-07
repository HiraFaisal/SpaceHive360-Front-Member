"use client"

import { Navbar } from "@/components/home/Navbar"
import { Footer } from "@/components/home/Footer"
import { motion } from "framer-motion"
import { 
  Building2, 
  Users, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  Globe, 
  MessageSquare, 
  Calendar,
  LayoutDashboard,
  TrendingUp,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const getAdminUrl = () => {
  if (typeof window !== 'undefined') {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isLocal ? "http://localhost:3002/register" : "https://spacehive360-admin.vercel.app/register";
  }
  return "http://localhost:3002/register";
}

export default function ListYourSpace() {
  const adminUrl = getAdminUrl();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Smart Space Management",
      description: "Effortlessly manage your inventory of desks, private offices, and meeting rooms with our intuitive interface."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Growth",
      description: "Connect with thousands of potential members searching for their next perfect workspace every day."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "AI-Powered Analytics",
      description: "Get deep insights into occupancy rates, revenue trends, and member behavior with our advanced AI tools."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Automated Billing",
      description: "Say goodbye to manual invoicing. Our system handles memberships, one-off bookings, and automated payments."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Secure Access Control",
      description: "Integrate with modern access systems to provide seamless, secure entry for your members 24/7."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "List your space once and gain visibility across our global network of professional hubs."
    }
  ]

  const tools = [
    {
      title: "Advanced Admin Dashboard",
      icon: <LayoutDashboard className="w-10 h-10 text-blue-600" />,
      points: [
        "Real-time occupancy tracking",
        "Membership plan designer",
        "Automated booking management",
        "Dynamic pricing engine"
      ]
    },
    {
      title: "Member Engagement Tools",
      icon: <MessageSquare className="w-10 h-10 text-emerald-600" />,
      points: [
        "Internal community forum",
        "Event management platform",
        "Direct member messaging",
        "Facility feedback system"
      ]
    },
    {
      title: "Revenue Optimization",
      icon: <TrendingUp className="w-10 h-10 text-purple-600" />,
      points: [
        "AI demand forecasting",
        "Automated revenue reports",
        "Custom promotion builder",
        "Tax and compliance tools"
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Building2 className="w-3.5 h-3.5" />
              For Space Owners & Hosts
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight"
            >
              Turn your space into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">revenue engine.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-500 leading-relaxed mb-10"
            >
              Join the world's most advanced coworking network. List your space in minutes, 
              reach thousands of remote professionals, and manage everything from a single, 
              powerful dashboard.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                href={adminUrl}
                className="group relative px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 uppercase tracking-widest text-xs flex items-center gap-2"
              >
                Register Your Brand
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-indigo-400/10 blur-[120px] rounded-full -z-10" />
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Features & Facilities</h2>
              <p className="text-4xl font-black text-gray-900 tracking-tight">Everything you need to run a <span className="italic">modern</span> workspace.</p>
            </div>
            <p className="text-gray-500 max-w-sm text-sm font-medium">
              We provide the infrastructure so you can focus on building your community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Tools & Benefits</h2>
            <p className="text-4xl font-black text-gray-900 tracking-tight">Access to the SpaceHive360 OS</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tools.map((tool, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="mb-8 p-4 bg-gray-50 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                  {tool.icon}
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-8">{tool.title}</h3>
                
                <ul className="space-y-4 w-full text-left">
                  {tool.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Section (Visual focus) */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-[60px] p-8 md:p-20 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-sm font-black text-blue-400 uppercase tracking-[0.2em] mb-6">Management Suite</h2>
                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
                  The only platform that <span className="text-blue-400 underline decoration-2 underline-offset-8">works</span> for you.
                </h3>
                
                <div className="space-y-8">
                  {[
                    { title: "Smart Bookings", text: "Interactive floor maps and instant booking confirmation." },
                    { title: "Dynamic Pricing", text: "AI adjusts your rates based on real-time market demand." },
                    { title: "Member CRM", text: "Full profile management and engagement history." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      {...fadeInUp}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 font-bold border border-white/5">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm font-medium">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                {/* Visual Representation of Dashboard */}
                <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full blur-[100px] absolute -top-20 -right-20" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                      Admin Dashboard v2.0
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-24 w-full bg-white/5 rounded-3xl border border-white/5 animate-pulse" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-40 bg-white/5 rounded-3xl border border-white/5 animate-pulse" />
                      <div className="h-40 bg-white/5 rounded-3xl border border-white/5 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SpaceHive Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-black text-purple-600 uppercase tracking-[0.2em] mb-16">Why SpaceHive360?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { val: "10k+", label: "Daily Users" },
              { val: "98%", label: "Satisfaction" },
              { val: "24h", label: "Fast Set-up" },
              { val: "3.5x", label: "ROI Increase" }
            ].map((stat, idx) => (
              <div key={idx} className="p-8">
                <p className="text-5xl font-black text-gray-900 mb-2">{stat.val}</p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[50px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-blue-600/20"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Ready to join the hive?</h2>
              <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto font-medium">
                Register your brand today and get 3 months of premium analytics for free. 
                Our team will help you onboard your space in less than 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href={adminUrl}
                  className="px-10 py-5 bg-white text-blue-600 font-black rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest text-sm shadow-xl"
                >
                  Create Host Account
                </a>
                <p className="text-blue-200 text-sm font-bold">
                  Clicking will redirect you to the Admin Portal
                </p>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
