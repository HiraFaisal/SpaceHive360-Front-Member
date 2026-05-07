"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, LogOut, User as UserIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/AuthContext"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              SpaceHive 360
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px]">
              Explore
            </Link>
            <Link href="/memberships" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px]">
              My Memberships
            </Link>
            <Link href="/community" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px]">
              Community
            </Link>
            {["Locations", "Solutions"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px]"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-blue-50">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-gray-900 leading-none mb-0.5">{user?.fullName}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Member</span>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="px-6 py-2.5 text-[11px] font-black text-gray-600 hover:text-blue-600 uppercase tracking-widest transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="px-6 py-2.5 text-[11px] font-black text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              <Link href="/explore" className="block text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md uppercase tracking-widest text-[11px]">
                Explore
              </Link>
              <Link href="/memberships" className="block text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md uppercase tracking-widest text-[11px]">
                My Memberships
              </Link>
              <Link href="/community" className="block text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md uppercase tracking-widest text-[11px]">
                Community
              </Link>
              {["Locations", "Solutions"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md uppercase tracking-widest text-[11px]"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {isAuthenticated ? (
                  <button 
                    onClick={logout}
                    className="w-full px-4 py-3 text-sm font-black text-red-600 bg-red-50 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                ) : (
                  <>
                    <Link href="/login" className="w-full px-4 py-3 text-sm font-black text-gray-700 border border-gray-100 rounded-xl hover:bg-gray-50 flex items-center justify-center uppercase tracking-widest">
                      Sign In
                    </Link>
                    <Link href="/register" className="w-full px-4 py-3 text-sm font-black text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-600/20 flex items-center justify-center uppercase tracking-widest">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
