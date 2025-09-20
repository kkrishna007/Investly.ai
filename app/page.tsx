import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { DealNoteSection } from "@/components/deal-note-section"
import { WhyInvestIQSection } from "@/components/why-investiq-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesGrid />
      <DealNoteSection />
      <WhyInvestIQSection />
      <Footer />
    </main>
  )
}
