'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AccessibilityPreferences {
  dyslexic: boolean;
  colorblind: boolean;
  blind: boolean;
  bilingual: boolean;
  rtl: boolean;
}

export default function AccessibilityPreferences() {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    dyslexic: false,
    colorblind: false,
    blind: false,
    bilingual: false,
    rtl: false,
  })
  const [language, setLanguage] = useState('')
  const router = useRouter()

  const handlePreferenceChange = (preference: keyof AccessibilityPreferences) => {
    setPreferences((prev) => ({ ...prev, [preference]: !prev[preference] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save preferences to user profile
    console.log('Accessibility preferences:', { ...preferences, language })
    router.push('/student/dashboard')
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Preferences</CardTitle>
          <CardDescription>Please select your accessibility needs to help us customize your learning experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={() => handlePreferenceChange(key as keyof AccessibilityPreferences)}
                  />
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language (for bilingual users)</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                  <SelectItem value="he">Hebrew</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Save Preferences
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

