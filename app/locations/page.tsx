"use client"

import { Navbar } from "@/components/home/Navbar"
import { Footer } from "@/components/home/Footer"
import { LocationsSection } from "@/components/home/LocationsSection"

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20"> {/* Offset for fixed navbar */}
        <LocationsSection />
      </div>
      <Footer />
    </main>
  )
}
