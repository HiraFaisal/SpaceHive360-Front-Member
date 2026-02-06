import { Navbar } from "@/components/home/Navbar"
import { Footer } from "@/components/home/Footer"
import { AboutHero } from "@/components/about/AboutHero"
import { StatsGrid } from "@/components/about/StatsGrid"
import { MissionSection } from "@/components/about/MissionSection"
import { TeamSection } from "@/components/about/TeamSection"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F0F4F8]">
      <Navbar />
      
      <AboutHero />
      <StatsGrid />
      <MissionSection />
      <TeamSection />
      
      {/* Careers CTA */}
      <section className="py-20 md:py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Join the movement</h2>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                We&apos;re always looking for talented individuals to help us redefine the future of workspace.
            </p>
            <button className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:scale-105">
                View Open Positions
            </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
