'use client';

import { useState, useEffect } from 'react';
import { communityApi } from '@/lib/api';
import { Calendar, MapPin, Users, X, Clock as ClockIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function UpcomingEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  useEffect(() => {
    communityApi.getEvents()
      .then(res => setEvents(res.data))
      .catch(err => console.error("Failed to fetch events:", err))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && events.length === 0) return null;

  return (
    <>
      <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
        <h3 className="text-sm font-bold text-foreground mb-6 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          Upcoming Events
        </h3>
        
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            events.map((event, i) => (
              <motion.div 
                key={event.recId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedEvent(event)}
                className="flex gap-4 group cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center h-14 w-12 rounded-2xl bg-primary/5 border border-primary/10 shrink-0 group-hover:bg-primary/10 transition-colors">
                  <span className="text-[10px] font-bold text-primary uppercase">{event.month}</span>
                  <span className="text-lg font-black text-foreground leading-none">{event.day}</span>
                </div>
                
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ClockIcon className="h-3 w-3" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
        
        <button className="w-full mt-6 py-2.5 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 text-xs font-bold text-muted-foreground hover:text-primary transition-all">
          View Calendar
        </button>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-[32px] shadow-2xl overflow-hidden"
            >
              {/* Header Image/Pattern */}
              <div className="h-32 bg-primary/10 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-md border border-border/50 hover:bg-background transition-colors z-10"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute -bottom-6 left-8 flex flex-col items-center justify-center h-20 w-16 rounded-2xl bg-primary shadow-lg border-2 border-card">
                  <span className="text-xs font-bold text-primary-foreground/80 uppercase">{selectedEvent.month}</span>
                  <span className="text-2xl font-black text-primary-foreground leading-none">{selectedEvent.day}</span>
                </div>
              </div>

              <div className="p-8 pt-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-[10px] font-bold text-primary uppercase tracking-wider">
                    Community Event
                  </span>
                </div>
                <h2 className="text-2xl font-black text-foreground mb-4 leading-tight">
                  {selectedEvent.title}
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/50">
                    <ClockIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Time</p>
                      <p className="text-xs font-bold text-foreground">{selectedEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/50">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Location</p>
                      <p className="text-xs font-bold text-foreground truncate">{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-foreground">About this event</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedEvent.description || "Join us for this exciting community event! It's a great opportunity to meet fellow members and grow your network in a relaxed environment."}
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center -space-x-3">
                    {selectedEvent.attendeeInitials?.map((initial: string, idx: number) => (
                      <div key={idx} className="h-8 w-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] font-bold">
                        {initial}
                      </div>
                    ))}
                    {selectedEvent.extraCount > 0 && (
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground border-2 border-card flex items-center justify-center text-[10px] font-bold">
                        +{selectedEvent.extraCount}
                      </div>
                    )}
                    <span className="ml-4 text-[11px] font-bold text-muted-foreground">Joining</span>
                  </div>
                  <button className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
