"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/home/Navbar"
import { motion } from "framer-motion"
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react"

export default function CancelPage() {
    const router = useRouter()

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <Navbar />
            
            <div className="flex-1 flex items-center justify-center p-4 pt-24">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-lg bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center"
                >
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <XCircle className="w-12 h-12 text-red-500" />
                    </div>
                    
                    <h1 className="text-3xl font-black text-gray-900 mb-4">Payment Cancelled</h1>
                    <p className="text-gray-500 font-medium mb-10">
                        The transaction was not completed. No charges were made to your card.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button 
                            onClick={() => router.back()}
                            className="py-4 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> Go Back
                        </button>
                        <button 
                            onClick={() => router.push('/explore')}
                            className="py-4 rounded-xl bg-white border border-gray-200 text-gray-900 font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" /> Try Again
                        </button>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
