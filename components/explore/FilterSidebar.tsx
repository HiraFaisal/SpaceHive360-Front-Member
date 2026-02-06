"use client"

import { useState, useEffect } from "react"
import { Check, SlidersHorizontal } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export function FilterSidebar({ resultCount }: { resultCount: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State initialization from URL or defaults
  const [priceRange, setPriceRange] = useState(
    searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : 1000
  )
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get("type") ? searchParams.get("type")!.split(",") : []
  )
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.get("amenities") ? searchParams.get("amenities")!.split(",") : []
  )
  const [capacity, setCapacity] = useState<string | null>(
    searchParams.get("capacity") || null
  )

  // Toggle handlers
  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    )
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    
    if (priceRange < 1000) params.set("maxPrice", priceRange.toString())
    if (selectedTypes.length > 0) params.set("type", selectedTypes.join(","))
    if (selectedAmenities.length > 0) params.set("amenities", selectedAmenities.join(","))
    if (capacity) params.set("capacity", capacity)

    // Preserve location if it exists
    const location = searchParams.get("location")
    if (location) params.set("location", location)

    router.push(`/explore?${params.toString()}`)
  }

  const clearAll = () => {
    setPriceRange(1000)
    setSelectedTypes([])
    setSelectedAmenities([])
    setCapacity(null)
    router.push('/explore')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-900" />
            <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        </div>
        <button 
            onClick={clearAll}
            className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-colors"
        >
            Clear All
        </button>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-900 text-sm">Max Price</h4>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                ${priceRange}/day
            </span>
        </div>
        <div className="px-1">
            <input 
                type="range" 
                min="0" 
                max="1000" 
                step="50"
                value={priceRange} 
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
            />
            <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <span>$0</span>
                <span>$1,000+</span>
            </div>
        </div>
      </div>

      {/* Workspace Type */}
      <div>
        <h4 className="font-bold text-gray-900 mb-4 text-sm">Workspace Type</h4>
        <div className="space-y-3">
            {["Hot Desk", "Private Office", "Meeting Room", "Virtual Office"].map((type) => {
                const isSelected = selectedTypes.includes(type)
                return (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group select-none">
                        <div 
                            className={`w-5 h-5 rounded-[6px] border-2 transition-all flex items-center justify-center ${
                                isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400 bg-white'
                            }`}
                            onClick={() => toggleType(type)}
                        >
                            <Check className={`w-3 h-3 text-white transition-transform ${isSelected ? 'scale-100' : 'scale-0'}`} strokeWidth={3} />
                        </div>
                        <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                            {type}
                        </span>
                    </label>
                )
            })}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="font-bold text-gray-900 mb-4 text-sm">Amenities</h4>
        <div className="space-y-3">
            {["High-Speed WiFi", "Coffee Bar", "24/7 Access", "Phone Booths", "Pet Friendly"].map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity)
                return (
                    <label key={amenity} className="flex items-center gap-3 cursor-pointer group select-none">
                         <div 
                            className={`w-5 h-5 rounded-[6px] border-2 transition-all flex items-center justify-center ${
                                isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400 bg-white'
                            }`}
                            onClick={() => toggleAmenity(amenity)}
                        >
                            <Check className={`w-3 h-3 text-white transition-transform ${isSelected ? 'scale-100' : 'scale-0'}`} strokeWidth={3} />
                        </div>
                        <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                            {amenity}
                        </span>
                    </label>
                )
            })}
        </div>
      </div>

       {/* Capacity */}
       <div>
        <h4 className="font-bold text-gray-900 mb-4 text-sm">Capacity</h4>
        <div className="grid grid-cols-4 gap-2">
            {["1-2", "3-6", "7-12", "12+"].map((cap) => (
                <button 
                  key={cap}
                  onClick={() => setCapacity(cap === capacity ? null : cap)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      capacity === cap 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-200 hover:text-blue-600'
                  }`}
                >
                    {cap}
                </button>
            ))}
        </div>
      </div>

      <button 
        onClick={applyFilters}
        className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
      >
        Show {resultCount} Results
      </button>
    </div>
  )
}
