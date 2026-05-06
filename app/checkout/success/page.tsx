"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/home/Navbar"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Download, Clock, Loader2 } from "lucide-react"
import { paymentApi } from "@/lib/api"

function SuccessContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const bookingId = searchParams.get("booking_id")
    const sessionId = searchParams.get("session_id")
    const isBank = searchParams.get("type") === "bank"
    
    const [verifying, setVerifying] = useState(!isBank && !!sessionId)

    useEffect(() => {
        if (sessionId && !isBank) {
            const verify = async () => {
                try {
                    await paymentApi.verifyPayment(sessionId)
                } catch (error) {
                    console.error("Verification failed:", error)
                } finally {
                    setVerifying(false)
                }
            }
            verify()
        }
    }, [sessionId, isBank])

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <Navbar />
            
            <div className="flex-1 flex items-center justify-center p-4 pt-24">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-lg bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center"
                >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${
                        isBank ? "bg-blue-50" : "bg-green-50"
                    }`}>
                        {isBank ? (
                            <Clock className="w-12 h-12 text-blue-600" />
                        ) : (
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                        )}
                    </div>
                    
                    <h1 className="text-3xl font-black text-gray-900 mb-4">
                        {isBank ? "Proof Submitted!" : "Payment Successful!"}
                    </h1>
                    <p className="text-gray-500 font-medium mb-10">
                        {isBank 
                            ? "We've received your payment proof. Our administrative team will verify the transaction and activate your membership shortly."
                            : "Your booking has been confirmed. We've sent the receipt and access details to your email."
                        }
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left">
                        {bookingId && (
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                                <span className="text-xs font-bold text-gray-400 uppercase">Reference ID</span>
                                <span className="text-sm font-bold text-gray-900">{bookingId?.slice(0, 8).toUpperCase()}...</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-400 uppercase">Current Status</span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 ${
                                isBank 
                                    ? "bg-blue-100 text-blue-600" 
                                    : verifying 
                                        ? "bg-gray-100 text-gray-500"
                                        : "bg-green-100 text-green-600"
                            }`}>
                                {isBank ? "Pending Verification" : verifying ? <><Loader2 className="w-3 h-3 animate-spin" /> Verifying</> : "Confirmed"}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button 
                            onClick={() => router.push('/explore')}
                            className="py-4 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                        >
                            Return Home <ArrowRight className="w-4 h-4" />
                        </button>
                        <button 
                            className="py-4 rounded-xl bg-white border border-gray-200 text-gray-900 font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" /> Save Receipt
                        </button>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-gray-900" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    )
}
