import { userActivityApi } from './api';

export type ActionType = 'VIEW' | 'CLICK' | 'BOOK' | 'FAVORITE';

interface TrackingEvent {
  workspaceId: string;
  actionType: ActionType;
  memberId?: string;
}

class UserTracker {
  private queue: TrackingEvent[] = [];
  private batchInterval = 5000; // Decreased to 5 seconds for faster feedback
  private timer: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // Flush on page visibility change (when user leaves)
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.flush();
        }
      });
      
      // Flush on page unload as a fallback
      window.addEventListener('beforeunload', () => {
        this.flush();
      });

      this.startTimer();
    }
  }

  public track(workspaceId: string, actionType: ActionType, memberId?: string) {
    // Basic validation
    if (!workspaceId) return;

    console.log(`[Tracker] Queuing event: ${actionType} for workspace ${workspaceId}`);

    this.queue.push({ 
        workspaceId, 
        actionType, 
        memberId: memberId || undefined 
    });
    
    // If queue gets too large, flush immediately
    if (this.queue.length >= 20) {
      this.flush();
    }
  }

  private startTimer() {
    if (typeof window === 'undefined') return;
    
    if (this.timer) clearInterval(this.timer);
    
    this.timer = setInterval(() => {
      this.flush();
    }, this.batchInterval);
  }

  private async flush() {
    if (this.queue.length === 0) return;

    const batch = [...this.queue];
    this.queue = [];

    console.log(`[Tracker] Flushing ${batch.length} events to backend...`);

    try {
      // Async fire-and-forget from frontend perspective
      userActivityApi.logBatch(batch).then(() => {
          console.log(`[Tracker] Successfully logged ${batch.length} events`);
      }).catch((err) => {
          console.error(`[Tracker] Failed to log events:`, err);
      });
    } catch (error) {
      console.error(`[Tracker] Flush error:`, error);
    }
  }
}

// Singleton instance
export const tracker = typeof window !== 'undefined' ? new UserTracker() : null;
