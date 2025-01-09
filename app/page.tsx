import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'
import { FeatureCard } from '@/components/FeatureCard'
import { FEATURES } from '@/lib/constants'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/preferences" className="text-sm font-medium text-gray-600 hover:text-primary">
              Preferences
            </Link>
            <Link href="/faq" className="text-sm font-medium text-gray-600 hover:text-primary">
              FAQ
            </Link>
            <Link href="/help" className="text-sm font-medium text-gray-600 hover:text-primary">
              Help
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-primary">
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Learning is{' '}
            <span className="text-primary">for All</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Empowering every learner with accessible, inclusive, and personalized education tools.
          </p>
          <Link href="/role-selection">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-50 border-t mt-32">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Logo className="text-gray-600" />
          </div>
        </div>
      </footer>
    </div>
  )
}

