"use client"

const team = [
  { name: "Sarah Chen", role: "CEO & Co-Founder", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2340&auto=format&fit=crop" },
  { name: "Marcus Johnson", role: "Head of Design", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2340&auto=format&fit=crop" },
  { name: "Elena Rodri", role: "CTO", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2336&auto=format&fit=crop" },
  { name: "David Kim", role: "Head of Operations", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2338&auto=format&fit=crop" },
]

export function TeamSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the minds</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          We&apos;re a diverse team of dreamers, builders, and doers obsessed with the future of work.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member) => (
          <div key={member.name} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-[2rem] mb-4 h-80">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
            <p className="text-blue-600 font-medium text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
