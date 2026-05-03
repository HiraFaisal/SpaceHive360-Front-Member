"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/home/Navbar"
import { memberApi } from "@/lib/api"
import ImageWithFallback from "@/components/ui/ImageWithFallback"
import { useAuth } from "@/context/AuthContext"
import { 
    MapPin, Star, Share2, Heart, Check, Wifi, Shield, 
    Coffee, Users, Clock, ArrowLeft, Zap, ShieldCheck, Info
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { ReviewsSection } from "@/components/explore/ReviewsSection"
import { useTracker } from "@/hooks/useTracker"

export default function WorkspaceDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const { isAuthenticated } = useAuth()
    const { trackAction } = useTracker()
    const [plan, setPlan] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("Overview")

    useEffect(() => {
        if (plan && plan.plan && plan.plan.recId) {
            trackAction(plan.plan.recId, 'VIEW');
        }
    }, [plan, trackAction]);

    useEffect(() => {
        async function fetchDetail() {
            try {
                const res = await memberApi.getPlanById(id as string)
                setPlan(res.data.data)
            } catch (error) {
                console.error("Failed to fetch plan detail:", error)
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchDetail()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <div className="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-400 font-medium text-sm">Loading workspace...</p>
            </div>
        )
    }

    if (!plan) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Workspace not found</h2>
                <button onClick={() => router.back()} className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold text-sm">Go Back</button>
            </div>
        )
    }

    const { plan: data, type, cityName, categoryName } = plan
    let images = []
    let features = []
    try {
        images = data.images ? (typeof data.images === 'string' ? JSON.parse(data.images) : data.images) : []
    } catch (e) { images = [] }
    try {
        features = data.features ? (typeof data.features === 'string' ? JSON.parse(data.features) : data.features) : []
    } catch (e) { features = [] }

    const displayImages = images.length > 0 ? images : [null]

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            {/* Page Container */}
            <div className="pt-20 lg:pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-900 text-xs font-bold uppercase tracking-wider mb-6 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Explore
                </button>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded bg-blue-600 text-[9px] font-bold text-white uppercase tracking-widest">
                                {type} Plan
                            </span>
                            <span className="px-2 py-0.5 rounded bg-gray-100 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                                {categoryName}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                            {data.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                            <div className="flex items-center gap-1.5 text-gray-900">
                                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                {cityName}
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-900">
                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                4.9 <span className="text-gray-400 font-medium">(128 reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => trackAction(data.recId, 'FAVORITE')}
                            className="p-2.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <Heart className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Grid Gallery - Refined size */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-10 h-[300px] md:h-[450px]">
                    <div className="md:col-span-8 relative rounded-2xl overflow-hidden shadow-sm">
                        <ImageWithFallback 
                            src={displayImages[0]} 
                            alt={data.name} 
                            fill 
                            className="object-cover hover:scale-105 transition-transform duration-700" 
                        />
                    </div>
                    <div className="md:col-span-4 grid grid-rows-2 gap-3">
                        <div className="relative rounded-2xl overflow-hidden shadow-sm">
                            <ImageWithFallback 
                                src={displayImages[1] || displayImages[0]} 
                                alt={data.name} 
                                fill 
                                className="object-cover hover:scale-105 transition-transform duration-700" 
                            />
                        </div>
                        <div className="relative rounded-2xl overflow-hidden shadow-sm">
                            <ImageWithFallback 
                                src={displayImages[2] || displayImages[0]} 
                                alt={data.name} 
                                fill 
                                className="object-cover hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                                <span className="text-white font-bold text-xs">+ View Gallery</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-10">
                        {/* Sub-nav tabs */}
                        <div className="flex border-b border-gray-200 gap-8">
                            {["Overview", "Amenities", "Reviews", "Location"].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-3 text-[11px] font-bold tracking-widest uppercase transition-all relative ${
                                        activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'
                                    }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div 
                                            layoutId="activeTabUnderline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" 
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content Sections */}
                        <div className="space-y-10 min-h-[400px]">
                            <AnimatePresence mode="wait">
                                {activeTab === "Overview" && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="space-y-10"
                                    >
                                        <section>
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">The Work Experience</h3>
                                            <p className="text-gray-500 leading-relaxed text-sm">
                                                {data.description || "Designed by award-winning architects, this workspace offers a unique blend of industrial heritage and modern luxury. Situated in a prime location, it provides a curated environment for visionaries and creative leaders."}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Why this space matches you</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {[
                                                    "Nearby your frequent transit routes.",
                                                    "Fits your preferred monthly workspace budget.",
                                                    "Matches your preference for premium architectural designs."
                                                ].map((match, i) => (
                                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
                                                        <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                                                        <p className="text-xs font-bold text-gray-700">{match}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </motion.div>
                                )}

                                {activeTab === "Amenities" && (
                                    <motion.div
                                        key="amenities"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <section>
                                            <div className="flex items-center justify-between mb-8">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">What this space offers</h3>
                                                    <p className="text-xs text-gray-500 font-medium">Premium features included with your booking</p>
                                                </div>
                                                <div className="px-3 py-1 rounded-full bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                                                    {features.length} Amenities
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {features.length > 0 ? features.map((feat: string) => {
                                                    const getIcon = (name: string) => {
                                                        const n = name.toLowerCase();
                                                        if (n.includes("wifi") || n.includes("internet")) return <Wifi className="w-4 h-4" />;
                                                        if (n.includes("coffee") || n.includes("tea") || n.includes("refreshment") || n.includes("kitchen")) return <Coffee className="w-4 h-4" />;
                                                        if (n.includes("shield") || n.includes("security") || n.includes("safe")) return <ShieldCheck className="w-4 h-4" />;
                                                        if (n.includes("user") || n.includes("meeting") || n.includes("community") || n.includes("desk")) return <Users className="w-4 h-4" />;
                                                        if (n.includes("clock") || n.includes("access") || n.includes("24/7")) return <Clock className="w-4 h-4" />;
                                                        if (n.includes("zap") || n.includes("power") || n.includes("electricity") || n.includes("fast")) return <Zap className="w-4 h-4" />;
                                                        return <Check className="w-4 h-4" />;
                                                    };

                                                    return (
                                                        <motion.div 
                                                            key={feat}
                                                            whileHover={{ y: -2 }}
                                                            className="flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-600/5 transition-all group"
                                                        >
                                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                                {getIcon(feat)}
                                                            </div>
                                                            <span className="text-[13px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                                                                {feat}
                                                            </span>
                                                        </motion.div>
                                                    )
                                                }) : (
                                                    <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-50 rounded-3xl">
                                                        <Info className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                                                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Premium essentials included</p>
                                                    </div>
                                                )}
                                            </div>
                                        </section>
                                    </motion.div>
                                )}

                                {activeTab === "Reviews" && (
                                    <motion.div
                                        key="reviews"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                    >
                                        <ReviewsSection 
                                            planId={data.recId} 
                                            planType={type} 
                                            companyId={data.fkCompany}
                                        />
                                    </motion.div>
                                )}

                                {activeTab === "Location" && (
                                    <motion.div
                                        key="location"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                    >
                                        <section>
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
                                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
                                                    <MapPin className="w-4 h-4 text-blue-600" />
                                                    {cityName}, {data.location || "Premium District"}
                                                </div>
                                                <div className="h-64 rounded-xl bg-gray-200 overflow-hidden flex items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                                                    Map Integration Placeholder
                                                </div>
                                            </div>
                                        </section>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Sidebar: Booking Card */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28">
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
                                <div className="mb-8">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Starting from</h4>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-gray-900">${data.price}</span>
                                        <span className="text-sm font-bold text-gray-400">/{data.durationType || (type === 'Booking' ? 'hour' : 'day')}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-500 font-bold">Plan Category</span>
                                            <span className="text-gray-900 font-extrabold">{type}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-500 font-bold">Status</span>
                                            <span className="text-green-600 font-extrabold">Instant Confirm</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2.5 text-[10px] font-bold text-blue-600 bg-blue-50/50 p-4 rounded-xl leading-relaxed">
                                        <Info className="w-3.5 h-3.5 flex-shrink-0" />
                                        <span>No charge will be made until your host confirms the reservation.</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => {
                                        trackAction(data.recId, 'BOOK');
                                        const checkoutUrl = `/checkout?id=${data.recId}`;
                                        if (isAuthenticated) {
                                            router.push(checkoutUrl);
                                        } else {
                                            router.push(`/login?callbackUrl=${encodeURIComponent(checkoutUrl)}`);
                                        }
                                    }}
                                    className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] mb-6"
                                >
                                    Book This Space
                                </button>

                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Team of 10+ people?</p>
                                    <button className="text-xs font-bold text-blue-600 hover:underline">Contact Enterprise Sales</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-100 mt-20 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <h2 className="text-lg font-bold text-blue-600 mb-4">SpaceHive 360</h2>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[200px]">Connecting elite professionals with extraordinary workspaces.</p>
                        </div>
                        {["Product", "Company", "Subscribe"].map((title, i) => (
                             <div key={i}>
                                <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-4">{title}</h4>
                                <ul className="space-y-3 text-[11px] font-bold text-gray-500">
                                    <li><a href="#" className="hover:text-blue-600">Overview</a></li>
                                    <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
                                    <li><a href="#" className="hover:text-blue-600">Support</a></li>
                                </ul>
                             </div>
                        ))}
                    </div>
                    <div className="pt-8 border-t border-gray-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-400">
                        <p>© 2023 SpaceHive 360. All rights reserved.</p>
                        <div className="flex gap-6 uppercase tracking-wider">
                            <a href="#" className="hover:text-gray-900">Privacy</a>
                            <a href="#" className="hover:text-gray-900">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}
