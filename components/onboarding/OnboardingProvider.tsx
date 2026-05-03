"use client"

import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { OnboardingWizard } from './OnboardingWizard'

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Guard: Wait for component to mount to avoid hydration mismatch
  if (!mounted) return <>{children}</>

  // Guard: Ensure user is fully loaded before checking onboarding status
  if (isAuthenticated && (!user || user === undefined)) {
    return <>{children}</>
  }

  // Logic: Only show onboarding if user is logged in and hasn't completed onboarding
  const showOnboarding = isAuthenticated && user && user.isOnboardingCompleted === false

  return (
    <>
      {children}
      {showOnboarding && <OnboardingWizard />}
    </>
  )
}
