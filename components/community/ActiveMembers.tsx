'use client';

import { useState, useEffect } from 'react';
import { communityApi } from '@/lib/api.ts';
import { motion } from 'framer-motion';

export function ActiveMembers() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    communityApi.getActiveMembers().then(res => setMembers(res.data));
  }, []);

  return (
    <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
      <h3 className="text-sm font-bold text-foreground mb-6">Active Members</h3>
      <div className="flex flex-wrap gap-4">
        {members.length === 0 ? (
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 w-10 rounded-xl bg-muted animate-pulse border-2 border-card" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            {members.map((member, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="h-11 w-11 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-bold text-xs shadow-sm group-hover:scale-110 transition-transform cursor-pointer">
                  {member.initials}
                </div>
                {member.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-card shadow-sm" />
                )}
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {member.name}
                </div>
              </motion.div>
            ))}
            <button className="h-11 w-11 rounded-2xl border border-dashed border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all group">
              <span className="text-xl group-hover:scale-125 transition-transform">+</span>
            </button>
          </div>
        )}
      </div>
      <p className="text-[10px] text-muted-foreground mt-4 font-medium uppercase tracking-wider">
        Currently active in your hub
      </p>
    </div>
  );
}
