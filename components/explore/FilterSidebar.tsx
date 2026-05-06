"use client"

import { useState, useEffect } from "react"
import { Check, SlidersHorizontal, MapPin, LayoutGrid } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { memberApi } from "@/lib/api"
import CustomSelect from "@/components/ui/CustomSelect"

export function FilterSidebar({ resultCount }: { resultCount: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [cities, setCities] = useState<{value: string, label: string}[]>([])
  const [categories, setCategories] = useState<{value: string, label: string}[]>([])
  const [loading, setLoading] = useState(true)

  // State initialization from URL or defaults
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")
  const [priceRange, setPriceRange] = useState(
    searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : 1000
  )

  useEffect(() => {
    async function fetchData() {
      try {
        const [citiesRes, categoriesRes] = await Promise.all([
          memberApi.getCities(),
          memberApi.getCategories()
        ]);
        setCities((citiesRes.data.data || []).map(c => ({ value: c, label: c })));
        setCategories((categoriesRes.data.data || []).map(c => ({ value: c, label: c })));
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const applyFilters = () => {
    const params = new URLSearchParams()
    
    if (selectedCity) params.set("city", selectedCity)
    if (selectedCategory) params.set("category", selectedCategory)
    if (priceRange < 1000) params.set("maxPrice", priceRange.toString())

    router.push(`/explore?${params.toString()}`)
  }

  const clearAll = () => {
    setSelectedCity("")
    setSelectedCategory("")
    setPriceRange(1000)
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

      {/* City Filter */}
      <div>
        <h4 className="font-bold text-gray-900 mb-4 text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            City
        </h4>
        <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <CustomSelect 
                options={[{value: "", label: "All Cities"}, ...cities]}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="All Cities"
                isLoading={loading}
                icon={<MapPin className="w-4 h-4" />}
            />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-bold text-gray-900 mb-4 text-sm flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-blue-600" />
            Category
        </h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((cat) => {
                const isSelected = selectedCategory === cat.value
                return (
                    <label key={cat.value} className="flex items-center gap-3 cursor-pointer group select-none">
                        <div 
                            className={`w-5 h-5 rounded-[6px] border-2 transition-all flex items-center justify-center ${
                                isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400 bg-white'
                            }`}
                            onClick={() => setSelectedCategory(isSelected ? "" : cat.value)}
                        >
                            <Check className={`w-3 h-3 text-white transition-transform ${isSelected ? 'scale-100' : 'scale-0'}`} strokeWidth={3} />
                        </div>
                        <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                            {cat.label}
                        </span>
                    </label>
                )
            })}
        </div>
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
                <span>Rs. 0</span>
                <span>Rs. 1,000+</span>
            </div>
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
