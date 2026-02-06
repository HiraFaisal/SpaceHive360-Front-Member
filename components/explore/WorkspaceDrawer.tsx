"use client"

import { motion } from "framer-motion"
import { Workspace } from "@/data/workspaces"
import { X, MapPin, Star, Wifi, Shield, Coffee, Users, Share2, Heart } from "lucide-react"

interface WorkspaceDrawerProps {
  workspace: Workspace
  onClose: () => void
}

export function WorkspaceDrawer({ workspace, onClose }: WorkspaceDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-50 shadow-2xl overflow-y-auto"
      >
        {/* Header Image */}
        <div className="relative h-72">
            <img 
                src={workspace.image} 
                alt={workspace.title} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="absolute top-6 left-6 flex gap-3">
                 <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors">
                    <Share2 className="w-5 h-5" />
                 </button>
                 <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors">
                    <Heart className="w-5 h-5" />
                 </button>
            </div>

            <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-xs font-bold border border-white/30">
                        {workspace.type}
                    </span>
                    {workspace.isAiRecommended && (
                         <span className="px-2 py-0.5 rounded-md bg-blue-500/80 backdrop-blur-md text-xs font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            AI Match
                        </span>
                    )}
                </div>
                <h2 className="text-3xl font-bold leading-tight">{workspace.title}</h2>
                <div className="flex items-center text-sm font-medium text-gray-200 mt-1">
                     <MapPin className="w-4 h-4 mr-1" />
                     {workspace.location}
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
            {/* Price & Rating Row */}
            <div className="flex justify-between items-center pb-8 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-bold text-gray-900">{workspace.rating}</span>
                    <span className="text-sm text-gray-400">({workspace.reviews} reviews)</span>
                </div>
                <div className="text-right">
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-blue-600">${workspace.price}</span>
                        <span className="text-sm font-medium text-gray-500">{workspace.priceUnit}</span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">About this space</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                    Experience a premium workspace designed for productivity and collaboration. 
                    Featuring ergonomic furniture, abundant natural light, and high-speed connectivity. 
                    Located in the heart of {workspace.location}, you're just steps away from the city's best coffee shops and transit.
                </p>
            </div>

            {/* Amenities Grid */}
            <div>
                 <h3 className="text-lg font-bold text-gray-900 mb-4">Amenities</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <Wifi className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Fast WiFi</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Secure Access</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <Coffee className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Free Coffee</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <Users className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Community</span>
                    </div>
                 </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4">
                <a 
                    href={`/book/${workspace.id}`}
                    className="block w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 active:scale-[0.98] text-center"
                >
                    Book this Space
                </a>
                <p className="text-center text-xs text-gray-400 mt-4">No charge until booking is confirmed.</p>
            </div>
        </div>
      </motion.div>
    </>
  )
}
