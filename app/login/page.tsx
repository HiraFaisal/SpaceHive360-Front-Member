"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/home/Navbar"
import { authApi } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login } = useAuth()
    
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        
        try {
            const res = await authApi.login({ email, password })
            if (res.data.success) {
                login(res.data.data)
                router.push(callbackUrl)
            } else {
                setError(res.data.message)
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <Navbar />
            
            <div className="flex-1 flex items-center justify-center p-4 pt-24">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                >
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg shadow-blue-600/20">
                            <div className="w-6 h-6 bg-white rounded-full" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-500 text-sm mt-2">Enter your credentials to access your account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-600 transition-all font-medium text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-600 transition-all font-medium text-gray-900"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <p className="text-gray-500 text-sm font-medium">
                            Don't have an account?{" "}
                            <a 
                                href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} 
                                className="text-blue-600 font-bold hover:underline"
                            >
                                Create Account
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
