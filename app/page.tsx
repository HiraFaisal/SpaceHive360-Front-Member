import { Navbar } from "@/components/home/Navbar"
import { Hero } from "@/components/home/Hero"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { PremiumPlans } from "@/components/home/PremiumPlans"
import { ValueProps } from "@/components/home/ValueProps"
import { Testimonials } from "@/components/home/Testimonials"
import { CTA } from "@/components/home/CTA"
import { Footer } from "@/components/home/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <PremiumPlans />
      <ValueProps />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
