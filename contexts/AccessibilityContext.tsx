'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AccessibilityFeatures {
  rightToLeft: boolean
  voiceCommand: boolean
  textToSpeech: boolean
  signLanguage: boolean
  simplifiedLayout: boolean
  captionedVideos: boolean
  highContrast: boolean
  fontSize: 'normal' | 'large' | 'extra-large'
}

interface AccessibilityContextType {
  features: AccessibilityFeatures
  toggleFeature: (feature: keyof AccessibilityFeatures) => void
  setFontSize: (size: AccessibilityFeatures['fontSize']) => void
}

const defaultFeatures: AccessibilityFeatures = {
  rightToLeft: false,
  voiceCommand: false,
  textToSpeech: false,
  signLanguage: false,
  simplifiedLayout: false,
  captionedVideos: true,
  highContrast: false,
  fontSize: 'normal',
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [features, setFeatures] = useState<AccessibilityFeatures>(defaultFeatures)

  useEffect(() => {
    // Apply RTL
    document.documentElement.dir = features.rightToLeft ? 'rtl' : 'ltr'

    // Apply simplified layout
    document.body.classList.toggle('simplified-layout', features.simplifiedLayout)

    // Apply high contrast
    document.body.classList.toggle('high-contrast', features.highContrast)

    // Apply font size
    document.body.classList.remove('text-normal', 'text-large', 'text-xl')
    document.body.classList.add(`text-${features.fontSize}`)
  }, [features])

  const toggleFeature = (feature: keyof AccessibilityFeatures) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }))
  }

  const setFontSize = (size: AccessibilityFeatures['fontSize']) => {
    setFeatures(prev => ({
      ...prev,
      fontSize: size
    }))
  }

  return (
    <AccessibilityContext.Provider value={{ features, toggleFeature, setFontSize }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}

