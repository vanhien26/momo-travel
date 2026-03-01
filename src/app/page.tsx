/* ══════════════════════════════════════════════
 * HOME PAGE – MoMo Travel Hub
 *
 * Architecture:
 * - Server Component (default) – SSG cho performance
 * - Section ordering theo AIDA (Attention-Interest-Desire-Action):
 *   1. Hero (Attention: keyword targeting + typing effect)
 *   2. Destination Grid (Interest: data-driven pricing)
 *   3. Value Proposition / USP (Interest → Desire)
 *   4. Promo Banners (Desire: ưu đãi hiện có)
 *   5. Testimonials (Desire: social proof)
 *   6. FAQ (Objection handling + GEO snippets)
 *   7. CTA 500K (Action: conversion → App download)
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
import { DestinationGrid } from '@/components/sections/DestinationGrid';
import { ValueProposition } from '@/components/sections/ValueProposition';
import { PromoBanners } from '@/components/sections/PromoBanners';
import { TrustSignals } from '@/components/sections/TrustSignals';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTABlock } from '@/components/sections/CTABlock';

export default function HomePage() {
  return (
    <>
      {/* ── 1. ATTENTION ───────────────────── */}
      <HeroSection />

      {/* ── 2. INTEREST ────────────────────── */}
      <DestinationGrid />
      <ValueProposition />

      {/* ── 3. DESIRE ──────────────────────── */}
      <PromoBanners />
      <TrustSignals />

      {/* ── 4. OBJECTION HANDLING ──────────── */}
      <FAQSection />

      {/* ── 5. ACTION ──────────────────────── */}
      <CTABlock />
    </>
  );
}
