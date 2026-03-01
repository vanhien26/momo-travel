/* ══════════════════════════════════════════════
 * HOME PAGE – MoMo Travel Hub
 *
 * Architecture:
 * - Server Component (default) – SSG cho performance
 * - Section ordering theo conversion funnel:
 *   1. Hero (awareness + keyword targeting)
 *   2. Value Proposition (interest)
 *   3. Use Cases (consideration)
 *   4. Trust Signals (trust building)
 *   5. Comparison (evaluation)
 *   6. FAQ (objection handling + GEO snippets)
 *   7. CTA (conversion → App download/open)
 *
 * SEO Page Structure:
 * - 1 x H1 (in Hero)
 * - 6 x H2 (one per section)
 * - Semantic <section> wrappers
 * - JSON-LD đã inject ở root layout
 *
 * Performance:
 * - Static Generation (no runtime data fetching)
 * - Components lazy-loaded below fold (dynamic import)
 * - LCP target: Hero section < 2s
 * ══════════════════════════════════════════════ */

import { HeroSection } from '@/components/sections/HeroSection';
import { ValueProposition } from '@/components/sections/ValueProposition';
import { UseCases } from '@/components/sections/UseCases';
import { TrustSignals } from '@/components/sections/TrustSignals';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTABlock } from '@/components/sections/CTABlock';

export default function HomePage() {
  return (
    <>
      {/* ── Above the Fold ─────────────────── */}
      <HeroSection />

      {/* ── Below the Fold ─────────────────── */}
      <ValueProposition />
      <UseCases />
      <TrustSignals />
      <ComparisonTable />
      <FAQSection />
      <CTABlock />
    </>
  );
}
