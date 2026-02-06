import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Share2, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 border-b border-gray-200 pb-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  SpaceHive 360
                </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering the future of work through a curated marketplace of premium workspaces.
            </p>
            <div className="flex gap-4">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Share2 className="w-5 h-5" /></button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Mail className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Links Columns */}
          {[
            { header: "PLATFORM", links: ["Browse Spaces", "Pricing Plans", "Enterprise", "List your space"] },
            { header: "COMPANY", links: ["About Us", "Our Mission", "Careers", "Blog"] },
            { header: "LEGAL", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map((col) => (
             <div key={col.header}>
                <h4 className="font-bold text-gray-900 text-xs tracking-wider uppercase mb-6">{col.header}</h4>
                <ul className="space-y-4">
                    {col.links.map(link => (
                        <li key={link}>
                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">{link}</a>
                        </li>
                    ))}
                </ul>
             </div>
          ))}

            {/* Newsletter placeholder or extra column can go here if needed, keeping it empty for now to match design spacing */}
             <div></div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>&copy; 2024 SpaceHive 360. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                {/* Social icons could go here too */}
            </div>
        </div>
      </div>
    </footer>
  )
}
