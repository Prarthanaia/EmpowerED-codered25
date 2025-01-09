import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { AccessibilityProvider } from '@/contexts/AccessibilityContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EmpowerED',
  description: 'An inclusive educational app for diverse learners',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AccessibilityProvider>
          <div id="accessibility-root">{children}</div>
        </AccessibilityProvider>
      </body>
    </html>
  )
}



import './globals.css'