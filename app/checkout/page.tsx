"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/home/Navbar"
import { memberApi, authApi, paymentApi } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { loadStripe } from "@stripe/stripe-js"
import { 
    CreditCard, MapPin, Calendar, Clock, 
    ArrowRight, Loader2, ShieldCheck, CheckCircle2,
    User, Phone, Mail, Info
} from "lucide-react"
import ImageWithFallback from "@/components/ui/ImageWithFallback"

export default function CheckoutPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const planId = searchParams.get("id")
    const { user, isAuthenticated } = useAuth()
    
    const [plan, setPlan] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [phone, setPhone] = useState("")

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
            return
        }

        if (user?.phoneNumber) {
            setPhone(user.phoneNumber)
        }

        async function fetchPlan() {
            try {
                if (planId) {
                    const res = await memberApi.getPlanById(planId)
                    setPlan(res.data.data)
                }
            } catch (error) {
                console.error("Failed to fetch plan:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPlan()
    }, [planId, isAuthenticated, router])

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <div className="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-400 font-medium text-sm">Preparing checkout...</p>
            </div>
        )
    }

    if (!plan) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Plan not found</h2>
                <button onClick={() => router.push('/explore')} className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold text-sm">Return to Explore</button>
            </div>
        )
    }

    const { plan: data, type, cityName } = plan
    const subtotal = data.price
    const tax = subtotal * 0.1 // 10% tax for example
    const total = subtotal + tax

    const handleConfirmBooking = async () => {
        if (!user || !plan) return

        setProcessing(true)
        try {
            const res = await paymentApi.createCheckoutSession({
                planId: planId!,
                planType: type,
                successUrl: `${window.location.origin}/checkout/success`,
                cancelUrl: `${window.location.origin}/checkout/cancel`,
                memberUserId: user.userId
            })

            if (res.data.success) {
                const { checkoutUrl } = res.data.data
                // Redirect to Stripe Checkout
                window.location.href = checkoutUrl
            } else {
                alert(res.data.message)
            }
        } catch (error: any) {
            console.error("Payment error:", error)
            alert("Failed to initiate payment. Please try again.")
        } finally {
            setProcessing(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            
            <div className="pt-24 lg:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side: Information */}
                    <div className="flex-1 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <User className="w-6 h-6 text-blue-600" />
                                Your Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="text" 
                                            readOnly
                                            value={user?.fullName || ""}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-900 focus:outline-none cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="email" 
                                            readOnly
                                            value={user?.email || ""}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-900 focus:outline-none cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="tel" 
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter phone number"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 focus:border-blue-600 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                                <p className="text-xs text-blue-600 font-bold leading-relaxed">
                                    Please ensure your phone number is correct. We'll use it to send you booking confirmation and access codes.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-blue-600" />
                                Payment Method
                            </h2>
                            
                            <div className="p-6 rounded-2xl border-2 border-blue-600 bg-blue-50/20 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-white border border-gray-100 rounded flex items-center justify-center">
                                        <span className="text-[8px] font-black text-blue-800 italic">STRIPE</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Secure Payment Gateway</p>
                                        <p className="text-xs font-medium text-gray-500">Pay via Credit Card or Digital Wallet</p>
                                    </div>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Summary */}
                    <div className="w-full lg:w-[400px]">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-32"
                        >
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Booking Summary</h2>
                            
                            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="w-20 h-20 relative rounded-xl overflow-hidden shrink-0">
                                    <ImageWithFallback src={null} alt={data.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{type} Plan</span>
                                    <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1">{data.name}</h3>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                                        <MapPin className="w-3 h-3" />
                                        {cityName}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-bold">Subtotal</span>
                                    <span className="text-gray-900 font-extrabold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-bold">Service Fee (10%)</span>
                                    <span className="text-gray-900 font-extrabold">${tax.toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-base font-bold text-gray-900">Total Price</span>
                                    <span className="text-2xl font-black text-gray-900">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleConfirmBooking}
                                disabled={processing}
                                className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Confirm & Pay <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Secure SSL Encryption</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    )
}
