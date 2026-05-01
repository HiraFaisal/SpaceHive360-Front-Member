"use client"

import { Navbar } from "@/components/home/Navbar"
import { FilterSidebar } from "@/components/explore/FilterSidebar"
import { ExploreHeader } from "@/components/explore/ExploreHeader"
import { WorkspaceCard } from "@/components/explore/WorkspaceCard"
import { WorkspaceDrawer } from "@/components/explore/WorkspaceDrawer"
import { useSearchParams } from "next/navigation"
import { useMemo, Suspense, useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { memberApi } from "@/lib/api"

function ExploreContent() {
  const searchParams = useSearchParams()
  const [selectedWorkspace, setSelectedWorkspace] = useState<any | null>(null)
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const city = searchParams.get("city")
  const category = searchParams.get("category")

  useEffect(() => {
    async function fetchPlans() {
      setLoading(true)
      try {
        const res = await memberApi.getPlans({ 
          city: city || undefined, 
          category: category || undefined 
        })
        const data = res.data.data;
        // Merge memberships and bookings into one list for the UI
        const allPlans = [
            ...(data.memberships || []).map((p: any) => ({ ...p, type: 'Membership' })),
            ...(data.bookings || []).map((p: any) => ({ ...p, type: 'Booking' }))
        ]
        setPlans(allPlans)
      } catch (error) {
        console.error("Failed to fetch plans:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [city, category])

  // Map API plan to UI Workspace format
  const mappedPlans = useMemo(() => {
    return plans.map(p => {
        let images: string[] = []
        let features: string[] = []

        try {
            images = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images) : p.images) : []
        } catch (e) {
            console.error("Failed to parse images for plan:", p.recId, p.images)
            images = []
        }

        try {
            features = p.features ? (typeof p.features === 'string' ? JSON.parse(p.features) : p.features) : []
        } catch (e) {
            console.error("Failed to parse features for plan:", p.recId, p.features)
            features = []
        }

        return {
            id: p.recId,
            title: p.name,
            location: p.description || "Premium Location",
            distance: "Nearby", // Mocked
            price: p.price,
            priceUnit: p.durationType || (p.type === 'Booking' ? 'hour' : 'day'),
            image: Array.isArray(images) && images.length > 0 ? images[0] : null,
            type: p.planCategory === 'membership' ? 'Membership Plan' : 'Booking Plan',
            rating: 4.9,
            reviews: 12,
            tags: Array.isArray(features) ? features : [],
            isAiRecommended: true
        }
    })
  }, [plans])

  return (
    <>
        <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filters - Sticky on Desktop with Card styling */}
            <aside className="lg:sticky lg:top-36 h-fit hidden lg:block w-72">
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                    <FilterSidebar resultCount={mappedPlans.length} />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                <ExploreHeader count={mappedPlans.length} city={city} />
                
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                        <p className="text-gray-500 font-medium">Searching for best spaces...</p>
                    </div>
                ) : mappedPlans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {mappedPlans.map(workspace => (
                            <WorkspaceCard 
                                key={workspace.id} 
                                workspace={workspace as any} 
                                onClick={() => setSelectedWorkspace(workspace)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">🔍</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No workspaces found</h3>
                        <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                    </div>
                )}

                {/* Map Preview Banner */}
                <div className="mt-12 relative h-48 rounded-3xl overflow-hidden group cursor-pointer border-2 border-white shadow-xl">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2348&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                                Show Map View
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Detail Drawer */}
        <AnimatePresence>
            {selectedWorkspace && (
                <WorkspaceDrawer 
                    workspace={selectedWorkspace as any} 
                    onClose={() => setSelectedWorkspace(null)} 
                />
            )}
        </AnimatePresence>
    </>
  )
}

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#F0F4F8]">
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/20 blur-[100px] rounded-full" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/20 blur-[100px] rounded-full" />
      </div>

      <Navbar /> 
      
      <div className="relative z-10 pt-24 lg:pt-36 pb-12 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div>Loading...</div>}>
            <ExploreContent />
        </Suspense>
      </div>
    </main>
  )
}
