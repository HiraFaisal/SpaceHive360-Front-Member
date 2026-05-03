"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Compass, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Wifi, 
  Coffee, 
  Keyboard, 
  Clock, 
  ShieldCheck,
  Leaf,
  Zap,
  Building,
  Monitor
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { preferencesApi } from '@/lib/api'
import { cn } from '@/lib/utils'

const STEPS = [
  {
    id: 'budget',
    title: 'Your Budget',
    description: 'What is your monthly budget range for a workspace?',
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 'location',
    title: 'Ideal Location',
    description: 'Where would you prefer to work? (Select on map)',
    icon: <MapPin className="w-6 h-6" />
  },
  {
    id: 'amenities',
    title: 'Essential Amenities',
    description: 'What do you need to be productive?',
    icon: <Wifi className="w-6 h-6" />
  },
  {
    id: 'environment',
    title: 'Work Environment',
    description: 'What kind of atmosphere do you prefer?',
    icon: <Leaf className="w-6 h-6" />
  }
]

const AMENITIES = [
  { id: 'wifi', name: 'High-speed WiFi', icon: <Wifi className="w-4 h-4" /> },
  { id: 'coffee', name: 'Premium Coffee', icon: <Coffee className="w-4 h-4" /> },
  { id: 'parking', name: 'Free Parking', icon: <Zap className="w-4 h-4" /> }, // Zap as placeholder for parking
  { id: 'meeting', name: 'Meeting Rooms', icon: <Monitor className="w-4 h-4" /> },
  { id: 'access', name: '24/7 Access', icon: <Clock className="w-4 h-4" /> },
  { id: 'security', name: 'Security', icon: <ShieldCheck className="w-4 h-4" /> },
]

const ENVIRONMENTS = [
  { id: 'quiet', name: 'Quiet & Focused', description: 'Library-like atmosphere with minimal distractions.', icon: <Leaf className="w-5 h-5" /> },
  { id: 'vibrant', name: 'Vibrant & Social', description: 'Energetic space with background music and community events.', icon: <Zap className="w-5 h-5" /> },
  { id: 'professional', name: 'Corporate & Sleek', description: 'Minimalist, modern, and highly professional setting.', icon: <Building className="w-5 h-5" /> },
  { id: 'cozy', name: 'Cozy & Creative', description: 'Artistic, comfortable, and home-like vibes.', icon: <Keyboard className="w-5 h-5" /> },
]

export function OnboardingWizard() {
  const { user, updateUser } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    budgetMin: 100,
    budgetMax: 500,
    preferredLat: 33.6844,
    preferredLng: 73.0479,
    environment: 'quiet',
    amenities: [] as string[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleAmenity = (name: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(name)
        ? prev.amenities.filter(a => a !== name)
        : [...prev.amenities, name]
    }))
  }

  const handleSubmit = async () => {
    if (!user?.token) return
    setIsSubmitting(true)
    try {
      const response = await preferencesApi.savePreferences(formData, user.token)
      if (response?.data?.success) {
        updateUser({ isOnboardingCompleted: true })
      }
    } catch (error) {
      console.error('Failed to save preferences:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user || user?.isOnboardingCompleted) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-5xl bg-card rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[650px] border border-border/50"
      >
        {/* Left Sidebar - Refined Progress */}
        <div className="w-full md:w-80 bg-gradient-to-br from-primary via-primary/90 to-blue-700 p-10 text-white flex flex-col">
          <div className="flex items-center gap-3 mb-16">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-xl border border-white/20">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight leading-none">SpaceHive</span>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-medium">Preferences</span>
            </div>
          </div>

          <div className="space-y-8 flex-1">
            {STEPS.map((step, idx) => (
              <div 
                key={step.id}
                className={cn(
                  "flex items-center gap-5 transition-all duration-500",
                  idx === currentStep ? "opacity-100 translate-x-1" : "opacity-30"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-500",
                  idx <= currentStep 
                    ? "bg-white text-primary border-white shadow-lg shadow-white/10" 
                    : "border-white/20"
                )}>
                  {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-semibold">{idx + 1}</span>}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-semibold opacity-50 mb-0.5">Step 0{idx + 1}</span>
                  <span className={cn(
                    "text-sm transition-all duration-500",
                    idx === currentStep ? "font-bold" : "font-medium"
                  )}>{step.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs opacity-50 leading-relaxed font-medium">
              We use these preferences to curate a personalized workspace experience just for you.
            </p>
          </div>
        </div>

        {/* Right Content - Form Steps */}
        <div className="flex-1 p-10 md:p-16 flex flex-col relative bg-background/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <div className="mb-10">
                <div className="inline-flex p-4 bg-primary/10 text-primary rounded-2xl mb-6">
                  {STEPS[currentStep].icon}
                </div>
                <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-3">{STEPS[currentStep].title}</h2>
                <p className="text-muted-foreground text-lg">{STEPS[currentStep].description}</p>
              </div>

              {/* Step Content Rendering */}
              {currentStep === 0 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest ml-1">Min Budget ($)</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                        <input 
                          type="number" 
                          value={formData.budgetMin}
                          onChange={(e) => setFormData(prev => ({ ...prev, budgetMin: parseInt(e.target.value) }))}
                          className="w-full pl-10 pr-5 py-5 bg-secondary/50 border border-border rounded-[1.25rem] focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all text-2xl font-bold"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest ml-1">Max Budget ($)</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                        <input 
                          type="number" 
                          value={formData.budgetMax}
                          onChange={(e) => setFormData(prev => ({ ...prev, budgetMax: parseInt(e.target.value) }))}
                          className="w-full pl-10 pr-5 py-5 bg-secondary/50 border border-border rounded-[1.25rem] focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all text-2xl font-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Most premium coworking spaces in urban centers range between <span className="text-primary font-bold">$200 - $450</span> per month.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="h-72 glass-card rounded-[2rem] overflow-hidden relative group border border-border/50">
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/20">
                      <div className="text-center p-8">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                        </motion.div>
                        <p className="font-bold text-foreground text-xl">Interactive Map</p>
                        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">Select your preferred working zone in Islamabad.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-secondary/30 w-fit px-4 py-2 rounded-full">
                    <Compass className="w-3 h-3" />
                    <span>Lat: {formData.preferredLat}, Lng: {formData.preferredLng}</span>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {AMENITIES.map((amenity) => (
                    <button
                      key={amenity.id}
                      onClick={() => toggleAmenity(amenity.name)}
                      className={cn(
                        "flex items-center gap-4 p-5 rounded-[1.5rem] border-2 transition-all duration-300 text-left group",
                        formData.amenities.includes(amenity.name)
                          ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20"
                          : "bg-secondary/30 border-border/50 text-foreground hover:border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "p-3 rounded-xl transition-colors duration-300",
                        formData.amenities.includes(amenity.name) ? "bg-white/20" : "bg-background shadow-sm"
                      )}>
                        {amenity.icon}
                      </div>
                      <span className="font-semibold text-sm">{amenity.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {ENVIRONMENTS.map((env) => (
                    <button
                      key={env.id}
                      onClick={() => setFormData(prev => ({ ...prev, environment: env.id }))}
                      className={cn(
                        "flex items-start gap-5 p-6 rounded-[1.5rem] border-2 transition-all duration-500 text-left relative overflow-hidden",
                        formData.environment === env.id
                          ? "bg-card border-primary shadow-2xl shadow-primary/10"
                          : "bg-secondary/20 border-border/50 text-muted-foreground hover:border-primary/30 opacity-70"
                      )}
                    >
                      {formData.environment === env.id && (
                        <div className="absolute top-0 right-0 p-4">
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      <div className={cn(
                        "p-4 rounded-2xl shrink-0 mt-1 transition-all duration-500",
                        formData.environment === env.id 
                          ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" 
                          : "bg-background text-muted-foreground"
                      )}>
                        {env.icon}
                      </div>
                      <div className="flex-1 pr-8">
                        <span className={cn(
                          "block font-bold text-lg mb-1 transition-colors duration-500",
                          formData.environment === env.id ? "text-foreground" : "text-muted-foreground"
                        )}>{env.name}</span>
                        <p className="text-sm leading-relaxed">{env.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between pt-10 border-t border-border/50">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={cn(
                "flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all duration-300",
                currentStep === 0 ? "opacity-0 pointer-events-none" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold shadow-2xl shadow-primary/30 hover:bg-primary/90 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <>
                  <span className="tracking-tight">{currentStep === STEPS.length - 1 ? "Complete Setup" : "Continue"}</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
