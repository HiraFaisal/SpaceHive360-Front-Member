"use client"

import { Heart, Star, MapPin, Wifi, Coffee, DoorClosed } from "lucide-react"
import { Workspace } from "@/data/workspaces"
import { motion } from "framer-motion"

export function WorkspaceCard({ workspace, onClick }: { workspace: Workspace; onClick?: () => void }) {
  return (
    <motion.div 
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="relative h-64 p-3 pb-0">
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
            <img 
              src={workspace.image} 
              alt={workspace.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-black/5" />
        </div>
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex gap-2">
            {workspace.isAiRecommended && (
                <div className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    AI Recommended
                </div>
            )}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-6 right-6 p-2.5 rounded-full bg-white/30 backdrop-blur-md hover:bg-white text-white hover:text-red-500 transition-all shadow-md active:scale-95">
            <Heart className="w-5 h-5 fill-current/10 hover:fill-current" />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">{workspace.title}</h3>
                <div className="flex items-center text-xs font-medium text-gray-500">
                    <span className="truncate max-w-[150px]">{workspace.location}</span>
                    <span className="mx-1.5">•</span>
                    <span className="text-gray-400">{workspace.distance}</span>
                </div>
            </div>
            <div className="text-right">
                <div className="text-xl font-extrabold text-blue-600">${workspace.price}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{workspace.priceUnit}</div>
            </div>
        </div>

        {/* Categories / Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
            {workspace.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-gray-100/80 text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                    {tag}
                </span>
            ))}
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between">
            {/* Type Badge */}
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                workspace.type === 'Private Office' 
                ? 'bg-purple-50 text-purple-700 border-purple-100' 
                : workspace.type === 'Meeting Room'
                ? 'bg-orange-50 text-orange-700 border-orange-100'
                : 'bg-blue-50 text-blue-700 border-blue-100'
            }`}>
                {workspace.type}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-gray-900 text-sm">{workspace.rating}</span>
                <span className="text-xs text-gray-400 font-medium">({workspace.reviews})</span>
            </div>
        </div>
      </div>
    </motion.div>
  )
}
