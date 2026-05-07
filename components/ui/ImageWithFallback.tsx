"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BACKEND_URL } from '@/lib/api'

interface ImageWithFallbackProps {
  src?: string | null
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"

export default function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  fill, 
  width, 
  height 
}: ImageWithFallbackProps) {
  const getInitialSrc = () => {
    if (!src || typeof src !== 'string') return FALLBACK_IMAGE
    
    if (src.startsWith('http')) return src
    
    // Ensure there is exactly one slash between BACKEND_URL and src
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`
    return `${BACKEND_URL}${normalizedSrc}`
  }

  const [imgSrc, setImgSrc] = useState<string>(getInitialSrc())

  // Update imgSrc if src prop changes
  useEffect(() => {
    setImgSrc(getInitialSrc())
  }, [src])

  const handleError = () => {
    if (imgSrc !== FALLBACK_IMAGE) {
        setImgSrc(FALLBACK_IMAGE)
    }
  }

  // Safety check for next/image
  const finalSrc = imgSrc || FALLBACK_IMAGE

  if (fill) {
    return (
      <Image
        src={finalSrc}
        alt={alt || "Workspace Image"}
        fill
        className={className}
        onError={handleError}
        style={{ objectFit: 'cover' }}
        unoptimized={finalSrc.startsWith('http://localhost')} // Helpful for local dev
      />
    )
  }

  return (
    <Image
      src={finalSrc}
      alt={alt || "Workspace Image"}
      width={width || 500}
      height={height || 300}
      className={className}
      onError={handleError}
      unoptimized={finalSrc.startsWith('http://localhost')}
    />
  )
}
