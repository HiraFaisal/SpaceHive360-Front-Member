"use client"

import { ChevronDown, LayoutGrid, List, Sparkles } from "lucide-react"

export function ExploreHeader() {
  return (
    <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-blue-600">New York Explore</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">124 Workspaces in New York</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <p>AI-powered recommendations based on your preferences</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-gray-300 transition-colors shadow-sm">
                        <span>Sort: AI Recommended</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
                
                <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                    <button className="p-2 rounded-lg bg-gray-100 text-gray-900 shadow-sm">
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
