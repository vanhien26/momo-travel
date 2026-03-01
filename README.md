# MoMo Travel Hub – Microsite Du lịch Châu Á

Production-ready microsite cho MoMo, tối ưu Lighthouse 100 và AI Search (GEO).

---

## 1. Sơ đồ Cấu trúc Thư mục

```
momo-travel-hub/
├── public/
│   └── images/                    # Static assets (logo, OG image, avatars)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout: font, JSON-LD, Header/Footer
│   │   ├── page.tsx               # Homepage: assemble sections theo funnel
│   │   ├── globals.css            # Tailwind + CSS variables + Dark mode
│   │   ├── sitemap.ts             # Dynamic sitemap (Programmatic SEO ready)
│   │   ├── robots.ts              # Robots.txt (allow AI bots)
│   │   └── manifest.ts            # PWA manifest
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Sticky nav + mobile menu + deep link CTA
│   │   │   ├── Footer.tsx         # Internal linking hub + entity reinforcement
│   │   │   └── Breadcrumb.tsx     # Visual + Schema breadcrumb
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx    # H1 keyword + Answer-First paragraph
│   │   │   ├── ValueProposition.tsx  # 4 service cards với Information Gain
│   │   │   ├── UseCases.tsx       # Scenario-based intent mapping
│   │   │   ├── TrustSignals.tsx   # Testimonials + stats social proof
│   │   │   ├── ComparisonTable.tsx   # Semantic <table> so sánh dịch vụ
│   │   │   ├── FAQSection.tsx     # Native <details> accordion + FAQ Schema
│   │   │   └── CTABlock.tsx       # Dual CTA: App deep link + Store links
│   │   └── ui/
│   │       ├── Button.tsx         # Reusable CTA button (primary/secondary/ghost)
│   │       └── Card.tsx           # Reusable card wrapper
│   ├── lib/
│   │   ├── schema.ts             # JSON-LD generators (Organization, Product, FAQ, Breadcrumb)
│   │   ├── metadata.ts           # Dynamic metadata builder (title, OG, Twitter)
│   │   └── constants.ts          # Centralized content data + Entity definitions
│   └── types/
│       └── index.ts              # TypeScript interfaces
├── next.config.ts                # Image optimization, security headers, redirects
├── tailwind.config.ts            # MoMo brand tokens, animations, dark mode
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## 2. Lệnh Cài đặt

```bash
# Clone project
git clone <repo-url> momo-travel-hub
cd momo-travel-hub

# Install dependencies
npm install

# Chạy development server
npm run dev
# → http://localhost:3000

# Build production
npm run build

# Preview production build
npm start
```

**Yêu cầu hệ thống:** Node.js >= 18.17, npm >= 9

---

## 3. Triển khai (Deployment) trên Vercel

```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy
vercel

# Hoặc connect GitHub repo → Vercel auto-deploy
```

**Vercel Settings:**
- Framework: Next.js (auto-detected)
- Build Command: `next build`
- Output Directory: `.next`
- Environment Variables: (không cần cho version này)

**Custom Domain:** Trỏ `travel.momo.vn` → Vercel project trong DNS settings.

---

## 4. Checklist Chiến lược SEO & GEO đã Áp dụng

### Entity-Driven SEO
- [x] MoMo định nghĩa là Organization entity trong JSON-LD (`@type: Organization`)
- [x] Liên kết entity với FinancialService (`additionalType`)
- [x] `sameAs` links đến Facebook, YouTube, Wikipedia
- [x] Contact point, address structured data
- [x] Mỗi dịch vụ du lịch = Product schema liên kết với MoMo entity

### GEO (Generative Engine Optimization)
- [x] Answer-First content format: câu đầu tiên = direct answer
- [x] FAQ viết cho AI snippet extraction
- [x] Information Gain cao: số liệu cụ thể (99.000đ, 60 giây, 30+ quốc gia)
- [x] Robots.txt cho phép GPTBot, Google-Extended crawl
- [x] Structured data @graph pattern cho efficient parsing

### Technical SEO
- [x] Dynamic Metadata: title, description, OG, Twitter Card
- [x] Canonical URL enforcement trên mọi trang
- [x] Sitemap.xml dynamic generation
- [x] Robots.txt với sitemap reference
- [x] Semantic HTML5: `<main>`, `<article>`, `<section>`, `<nav>`, `<footer>`
- [x] H1 → H2 hierarchy (1 H1, 6 H2s)
- [x] Image optimization: AVIF/WebP, responsive sizes
- [x] Internal linking: Footer hub với tất cả service/destination pages

### Accessibility (WCAG 2.1 AA)
- [x] Skip to content link
- [x] ARIA labels trên tất cả interactive elements
- [x] `role` attributes cho landmarks
- [x] Focus-visible styles
- [x] Color contrast compliant
- [x] `prefers-reduced-motion` respect
- [x] Semantic table với `<caption>`, `<th scope>`
- [x] Keyboard navigable (Tab, Enter, Space)

### Webview Optimization (App MoMo)
- [x] CSS-only animations (không JS animation library)
- [x] Inline SVG icons (không external icon library)
- [x] Minimal JavaScript bundle
- [x] `overscroll-behavior: none` cho iOS webview
- [x] Compact mobile layout (360px base)

---

## 5. Ghi chú Tối ưu Performance

### Core Web Vitals Targets
| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.0s | CSS gradient hero (no image), font preload, SSG |
| FID/INP | < 100ms | Minimal JS, native `<details>` accordion |
| CLS | < 0.1 | Font `display: swap`, fixed-size containers |

### Lighthouse 100 Checklist
- **Performance:** SSG (no runtime fetch), Sharp image optimizer, code splitting tự động bởi Next.js
- **Accessibility:** ARIA, skip link, focus styles, color contrast, semantic HTML
- **Best Practices:** HTTPS, no console errors, CSP headers, no deprecated APIs
- **SEO:** Meta tags, canonical, sitemap, robots, structured data, mobile-friendly

### Kích thước Bundle ước tính
- First Load JS: ~85KB (Next.js base + page components)
- CSS: ~15KB (Tailwind purged)
- Không có: jQuery, Bootstrap, Lodash, Moment.js, Font Awesome

### Chiến lược Caching
- Static pages: ISR/SSG → Edge cache trên Vercel
- Images: `Cache-Control: public, max-age=31536000, immutable`
- Fonts: Google Fonts CDN cache + preconnect

---

## 6. Hướng dẫn Mở rộng (Programmatic SEO)

### Thêm trang SIM quốc gia mới
```
src/app/sim/[country]/page.tsx   → Dynamic route
src/lib/constants.ts             → Thêm data vào SIM_PACKAGES array
```

### Thêm trang điểm đến mới
```
src/app/diem-den/[slug]/page.tsx → Dynamic route
src/lib/constants.ts             → Thêm data vào DESTINATIONS array
```

### Scale lên hàng ngàn trang
- Data source: chuyển từ `constants.ts` sang CMS/API
- Sitemap: đã support dynamic generation
- Metadata: đã có `generatePageMetadata()` helper
- Schema: đã có generators cho mỗi page type

---

**Built with:** Next.js 14 · TypeScript · Tailwind CSS · Vercel
