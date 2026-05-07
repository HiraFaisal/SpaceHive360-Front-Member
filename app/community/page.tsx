'use client';

import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CommunityFeed } from '@/components/community/CommunityFeed';
import { CommunityStats } from '@/components/community/CommunityStats';
import { ActiveMembers } from '@/components/community/ActiveMembers';
import { UpcomingEvents } from '@/components/community/UpcomingEvents';
import { motion } from 'framer-motion';
import { Users, Sparkles, MessageSquare, Heart } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header Section */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-4"
          >
            <Sparkles className="h-4 w-4" />
            Community Hub
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6"
          >
            Discover. Engage. <span className="text-primary">Connect.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            Stay updated with the latest from your workspace providers and fellow members. 
            Join the conversation and keep your community thriving.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content - Feed */}
          <div className="lg:col-span-8">
            <CommunityFeed />
          </div>

          {/* Sidebar - Upcoming Events & Guidelines */}
          <div className="lg:col-span-4 space-y-8 sticky top-24">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <UpcomingEvents />
            </motion.div>

            {/* Community Guidelines Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-primary/5 rounded-3xl p-8 border border-primary/10 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-foreground mb-2">Community Guidelines</h4>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Help us keep SpaceHive a productive and friendly environment for everyone.
                </p>
                <ul className="space-y-3">
                  {[
                    "Be respectful and supportive",
                    "No spam or self-promotion",
                    "Keep discussions professional",
                    "Help others grow"
                  ].map((rule, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute -bottom-6 -right-6 text-primary/10 group-hover:scale-110 transition-transform duration-500">
                <Users size={120} />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
