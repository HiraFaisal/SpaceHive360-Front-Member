"use client"

import { motion } from "framer-motion"
import { Workspace } from "@/data/workspaces"
import { X, MapPin, Star, Share2, Heart, Users, Clock } from "lucide-react"
import ImageWithFallback from "@/components/ui/ImageWithFallback"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface WorkspaceDrawerProps {
  workspace: Workspace
  onClose: () => void
}

export function WorkspaceDrawer({ workspace, onClose }: WorkspaceDrawerProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  
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
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl overflow-y-auto"
      >
        {/* Header Image */}
        <div className="relative h-60">
            <ImageWithFallback 
                src={workspace.image} 
                alt={workspace.title} 
                fill
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>

            <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-[10px] font-bold uppercase tracking-tight">
                        {workspace.type}
                    </span>
                </div>
                <h2 className="text-xl font-bold leading-tight">{workspace.title}</h2>
            </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
            {/* Price & Rating Row */}
            <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                <div>
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Price</h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-gray-900">${workspace.price}</span>
                        <span className="text-xs font-medium text-gray-500">/{workspace.priceUnit}</span>
                    </div>
                </div>
                <div className="text-right">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Rating</h3>
                    <div className="flex items-center gap-1 justify-end">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold text-gray-900">{workspace.rating}</span>
                    </div>
                </div>
            </div>

            {/* Basic Info Cards */}
            <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Location</p>
                        <p className="text-xs font-bold text-gray-900">{workspace.location}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Clock className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Availability</p>
                        <p className="text-xs font-bold text-gray-900">Mon - Fri, 9:00 AM - 6:00 PM</p>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 space-y-3">
                <Link 
                    href={`/explore/${workspace.id}`}
                    className="block w-full py-3 rounded-lg bg-gray-900 text-white font-bold text-sm hover:bg-black transition-all shadow-lg active:scale-[0.98] text-center"
                >
                    View Detail
                </Link>
                <button 
                    onClick={() => {
                        const checkoutUrl = `/checkout?id=${workspace.id}`;
                        if (isAuthenticated) {
                            router.push(checkoutUrl);
                        } else {
                            router.push(`/login?callbackUrl=${encodeURIComponent(checkoutUrl)}`);
                        }
                    }}
                    className="block w-full py-3 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] text-center"
                >
                    Book this Space
                </button>
                <p className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest pt-1">Secure Payment & Instant Confirmation</p>
            </div>
        </div>
      </motion.div>
    </>
  )
}
