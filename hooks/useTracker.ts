"use client"

import { useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { tracker, ActionType } from '@/lib/tracker';

export function useTracker() {
  const { user } = useAuth();
  // Handle inconsistent property names from different API responses (userId vs recId vs id)
  const memberId = user?.userId || user?.recId || user?.id; 

  const trackAction = useCallback((workspaceId: string, actionType: ActionType) => {
    if (tracker) {
      console.log(`[useTracker] Tracking ${actionType} for ${workspaceId} (Member: ${memberId || 'Anonymous'})`);
      tracker.track(workspaceId, actionType, memberId);
    }
  }, [memberId]);

  return { trackAction };
}
