import { HeroSection } from '@/components/sections/HeroSection'
import { TripPlanningSteps } from '@/components/sections/TripPlanningSteps'
import { FeaturedDestinations } from '@/components/sections/FeaturedDestinations'
import { WhyMoMo } from '@/components/sections/WhyMoMo'
// import { Promotions } from '@/components/sections/Promotions'
import { SocialProof } from '@/components/sections/SocialProof'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TripPlanningSteps />
      <FeaturedDestinations />
      <WhyMoMo />
      <SocialProof />
      <FAQSection />
      <CTASection />
    </>
  )
}
