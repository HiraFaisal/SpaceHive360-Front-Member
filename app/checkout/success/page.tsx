"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/home/Navbar"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Download } from "lucide-react"

export default function SuccessPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const bookingId = searchParams.get("booking_id")

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <Navbar />
            
            <div className="flex-1 flex items-center justify-center p-4 pt-24">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-lg bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center"
                >
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    
                    <h1 className="text-3xl font-black text-gray-900 mb-4">Payment Successful!</h1>
                    <p className="text-gray-500 font-medium mb-10">
                        Your booking has been confirmed. We've sent the receipt and access details to your email.
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                            <span className="text-xs font-bold text-gray-400 uppercase">Booking ID</span>
                            <span className="text-sm font-bold text-gray-900">{bookingId?.slice(0, 8).toUpperCase()}...</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-400 uppercase">Status</span>
                            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase">Confirmed</span>
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
                            <Download className="w-4 h-4" /> Download Receipt
                        </button>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
