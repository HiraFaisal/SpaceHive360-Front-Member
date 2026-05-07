'use client';

import { useState, useEffect } from 'react';
import { Users, UserCheck, MessageSquare, TrendingUp } from 'lucide-react';
import { communityApi } from '@/lib/api';

export function CommunityStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    communityApi.getStats().then(res => setStats(res.data));
  }, []);

  const items = [
    { label: "Members", value: stats?.totalMembers || "...", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active", value: stats?.activeMembers || "...", icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Posts", value: stats?.totalPosts || "...", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Growth", value: (stats?.monthlyEngagement || 0) + "%", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
      <h3 className="text-sm font-bold text-foreground mb-6 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        Community Pulse
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.label} className="p-4 rounded-2xl bg-muted/30 border border-border/20 transition-all hover:bg-muted/50 group">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </span>
            </div>
            <p className="text-xl font-bold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Members</p>
          <div className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 font-medium">65% of members are active this week</p>
      </div>
    </div>
  );
}
