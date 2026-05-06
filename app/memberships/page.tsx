"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/home/Navbar"
import { membershipApi } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { 
    Calendar, Building2, Clock, CheckCircle2, 
    AlertCircle, ChevronRight, ArrowRight,
    Search, Filter, ShieldCheck, CreditCard,
    Sparkles, Info
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import ImageWithFallback from "@/components/ui/ImageWithFallback"

interface MyMembership {
    recId: string;
    workspaceName: string;
    planName: string;
    startDate: string;
    endDate: string;
    status: string;
    remainingDays: number;
    amount: number;
    isExtendable: boolean;
    isRenewable: boolean;
    planId: string;
    image?: string;
}

export default function MyMembershipsPage() {
    const { user, isAuthenticated } = useAuth()
    const [memberships, setMemberships] = useState<MyMembership[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'Active' | 'Expired' | 'Pending'>('all')

    useEffect(() => {
        if (!isAuthenticated) return

        const fetchMemberships = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token') || '';
                const res = await membershipApi.getMyMemberships(token)
                if (res.data.success) {
                    setMemberships(res.data.data)
                }
            } catch (error) {
                console.error("Failed to fetch memberships:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMemberships()
    }, [isAuthenticated])

    const filteredMemberships = memberships.filter(m => 
        filter === 'all' ? true : m.status === filter
    )

    const getFirstImage = (imageJson?: string) => {
        try {
            if (!imageJson) return "";
            if (imageJson.startsWith('http')) return imageJson;
            const images = JSON.parse(imageJson);
            return Array.isArray(images) && images.length > 0 ? images[0] : "";
        } catch (e) {
            return imageJson || "";
        }
    }

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-blue-50 text-blue-700 border-blue-100'
            case 'Expired':
                return 'bg-slate-50 text-slate-500 border-slate-100'
            case 'Pending':
                return 'bg-amber-50 text-amber-700 border-amber-100'
            default:
                return 'bg-gray-50 text-gray-700 border-gray-100'
        }
    }

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-white">
                <Navbar />
                <div className="pt-40 flex flex-col items-center justify-center text-center px-4">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                        <ShieldCheck className="w-10 h-10 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Sign In Required</h1>
                    <p className="text-gray-500 max-w-xs mb-8">Please sign in to your account to view your active memberships.</p>
                    <Link href="/login" className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-105 transition-all">
                        Go to Login
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-3">
                        <span>Portal</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-blue-600">My Memberships</span>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                                Manage Your <span className="text-blue-600">Plans</span>
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                <Sparkles className="w-4 h-4 text-blue-500" />
                                <p>Track your workspace subscriptions and renewal dates</p>
                            </div>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-100 w-fit">
                            {(['all', 'Active', 'Expired', 'Pending'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setFilter(t)}
                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                                        filter === t 
                                        ? 'bg-white text-blue-600 shadow-sm border border-gray-100' 
                                        : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    {t === 'all' ? 'All' : t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-[2rem] border border-gray-100 animate-pulse overflow-hidden">
                                <div className="h-48 bg-gray-100" />
                                <div className="p-6 space-y-4">
                                    <div className="h-6 bg-gray-100 rounded-lg w-3/4" />
                                    <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
                                    <div className="pt-4 space-y-2">
                                        <div className="h-4 bg-gray-50 rounded-lg" />
                                        <div className="h-4 bg-gray-50 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredMemberships.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredMemberships.map((membership) => (
                            <motion.div
                                key={membership.recId}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col"
                            >
                                {/* Workspace Image */}
                                <div className="relative h-48 overflow-hidden m-3 rounded-[1.5rem]">
                                    <ImageWithFallback 
                                        src={getFirstImage(membership.image)} 
                                        alt={membership.workspaceName} 
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    
                                    <div className="absolute top-4 right-4">
                                        <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${getStatusStyle(membership.status)}`}>
                                            {membership.status}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-0.5">Workspace</p>
                                        <h3 className="text-lg font-bold leading-tight">{membership.workspaceName}</h3>
                                    </div>
                                </div>

                                <div className="p-6 pt-2 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 mb-6 text-blue-600">
                                        <Building2 className="w-4 h-4" />
                                        <span className="text-sm font-bold tracking-tight">{membership.planName}</span>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-gray-400 font-medium">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-xs uppercase tracking-wider font-bold">Duration</span>
                                            </div>
                                            <span className="font-bold text-gray-700">
                                                {format(new Date(membership.startDate), 'MMM d')} - {format(new Date(membership.endDate), 'MMM d, yyyy')}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-gray-400 font-medium">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-xs uppercase tracking-wider font-bold">Status</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className={`font-bold ${membership.remainingDays < 3 && membership.status === 'Active' ? 'text-rose-500' : 'text-gray-900'}`}>
                                                    {membership.status === 'Active' ? `${membership.remainingDays} Days Left` : membership.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-50">
                                            <div className="flex items-center gap-2 text-gray-400 font-medium">
                                                <CreditCard className="w-4 h-4" />
                                                <span className="text-xs uppercase tracking-wider font-bold">Amount</span>
                                            </div>
                                            <span className="text-lg font-extrabold text-blue-600">${membership.amount}</span>
                                        </div>
                                    </div>

                                    {/* Action Section */}
                                    <div className="mt-auto">
                                        {membership.status === 'Active' && (
                                            <Link 
                                                href={`/checkout?id=${membership.planId}`}
                                                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-gray-200"
                                            >
                                                Extend Subscription <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        )}
                                        {membership.status === 'Expired' && (
                                            <Link 
                                                href={`/checkout?id=${membership.planId}`}
                                                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                                            >
                                                Renew Membership <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        )}
                                        {membership.status === 'Pending' && (
                                            <div className="flex flex-col gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                                <div className="flex items-center gap-2 text-amber-700">
                                                    <Info className="w-4 h-4" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">Awaiting Verification</span>
                                                </div>
                                                <p className="text-[11px] text-amber-600/80 font-medium leading-relaxed">
                                                    Our team is verifying your payment. Your membership will be activated shortly.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Building2 className="w-8 h-8 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">No memberships found</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">You haven't purchased any workspace plans yet. Explore our premium spaces to get started.</p>
                        <Link href="/explore" className="inline-flex items-center gap-3 px-8 py-3.5 bg-blue-600 text-white rounded-full font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-blue-600/20 hover:scale-105 transition-all">
                            Browse Workspaces
                        </Link>
                    </div>
                )}
            </div>
        </main>
    )
}
