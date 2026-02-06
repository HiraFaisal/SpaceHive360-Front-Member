"use client"

import { Navbar } from "@/components/home/Navbar"
import { workspaces } from "@/data/workspaces"
import { ArrowLeft, Star, ShieldCheck, CreditCard, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function BookingPage() {
    const params = useParams()
    const workspace = workspaces.find(w => w.id === params.id)

    if (!workspace) return <div className="p-20 text-center font-bold">Workspace not found</div>

  return (
    <main className="min-h-screen bg-[#F0F4F8]">
      <Navbar />

      <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link href="/explore" className="inline-flex items-center text-gray-500 hover:text-blue-600 font-bold mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explore
        </Link>

        {/* Header */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Confirm your booking</h1>

        <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Column: Form Details */}
            <div className="flex-1 space-y-6">
                
                {/* 1. Trip Details */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-5">
                         <h2 className="text-lg font-bold text-gray-900">Your Trip</h2>
                         <button className="text-blue-600 font-bold text-xs bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">Edit</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-gray-900">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Dates</div>
                                <div className="font-bold text-sm text-gray-900">Feb 12 - Feb 14</div>
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                             <div className="p-2 bg-white rounded-lg shadow-sm text-gray-900">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Times</div>
                                <div className="font-bold text-sm text-gray-900">09:00 AM - 06:00 PM</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Guests</label>
                        <div className="relative">
                            <select className="w-full p-3 pl-4 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer text-gray-900">
                                <option>1 Guest</option>
                                <option>2 Guests</option>
                                <option>Team (3-5)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Contact Information (New Section) */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-5">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 ml-1">First Name</label>
                            <input 
                                type="text" 
                                placeholder="John" 
                                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-400"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 ml-1">Last Name</label>
                            <input 
                                type="text" 
                                placeholder="Doe" 
                                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-400"
                            />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-gray-700 ml-1">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="john@company.com" 
                                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-400"
                            />
                        </div>
                         <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-gray-700 ml-1">Phone Number</label>
                            <input 
                                type="tel" 
                                placeholder="+1 (555) 000-0000" 
                                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Payment Method */}
                 <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-5">
                         <h2 className="text-lg font-bold text-gray-900">Payment</h2>
                         <div className="flex gap-2">
                             <CreditCard className="w-5 h-5 text-blue-600" />
                         </div>
                    </div>
                    
                    {/* Card Details Form */}
                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 ml-1">Card Number</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="0000 0000 0000 0000" 
                                    className="w-full p-3 pl-10 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-400"
                                />
                                <CreditCard className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700 ml-1">Expiration</label>
                                <input 
                                    type="text" 
                                    placeholder="MM / YY" 
                                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-400"
                                />
                            </div>
                             <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700 ml-1">CVC</label>
                                <input 
                                    type="text" 
                                    placeholder="123" 
                                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 ml-1">Cardholder Name</label>
                            <input 
                                type="text" 
                                placeholder="Name on Card" 
                                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-2 pb-8">
                     <p className="text-[10px] text-gray-500 mb-4 text-center max-w-md mx-auto leading-relaxed">
                        By selecting the button below, I agree to the <span className="underline cursor-pointer hover:text-blue-600">Host&apos;s House Rules</span>, <span className="underline cursor-pointer hover:text-blue-600">Ground Rules for Guests</span>, and that SpaceHive 360 can charge my payment method if I&apos;m responsible for damage.
                    </p>
                    <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.99] flex items-center justify-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-blue-200" />
                        Confirm and Pay
                    </button>
                </div>

            </div>

            {/* Right Column: Order Summary (Sticky) */}
            <div className="lg:w-[400px]">
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-32">
                    
                    {/* Workspace Mini Card */}
                    <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={workspace.image} alt={workspace.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-blue-600 mb-1">{workspace.type}</div>
                            <h3 className="font-bold text-gray-900 leading-tight mb-2">{workspace.title}</h3>
                            <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{workspace.rating} ({workspace.reviews})</span>
                            </div>
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Price Details</h3>
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-600 text-sm font-medium">
                            <span>${workspace.price} x 2 Days</span>
                            <span>${workspace.price * 2}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm font-medium">
                            <span>Service Fee</span>
                            <span>$15</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm font-medium">
                            <span>Taxes</span>
                            <span>$12</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                        <span className="font-bold text-gray-900">Total (USD)</span>
                        <span className="text-2xl font-extrabold text-blue-600">${workspace.price * 2 + 15 + 12}</span>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </main>
  )
}
