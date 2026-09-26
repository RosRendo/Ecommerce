# Specification: ATELIER Monochrome Luxury Platform

**Feature ID:** SPEC-001  
**Status:** Implemented & Verified  
**Priority:** Critical  
**Target:** Production MVP

---

## 1. Objective & Philosophy
Build a production-quality luxury black-and-white ecommerce experience inspired by high-end technology brands (Leica, Teenage Engineering, Apple), luxury fashion houses (The Row, Bottega Veneta), and modern editorial publications (Kinfolk, Cereal). The platform rejects generic Shopify conventions in favor of disciplined reduction, quiet authority, and material truth.

---

## 2. Functional Requirements

### FR-01: Navigation System
- Minimal header displaying brand logo `ATELIER`, links to `Shop`, `Collections`, `New`, `Journal`, `About`.
- Actions: `Search` with global `⌘K` shortcut, `Account` link, and `Bag` trigger with live badge.
- Automatic transition on scroll into a compact sticky navigation bar (`h-16`).
- Automatic suppression of header and footer on the `/checkout` route.

### FR-02: Editorial Homepage
- Hero Section: Enormous product photography, concise headline, dual CTAs (`Explore Collection`, `The Monograph`).
- Featured Collection: Asymmetrical editorial layout with varied image proportions and generous whitespace.
- New Arrivals: 4-column product grid with 1.02x hover image scaling and secondary photo crossfade.
- Brand Section: Philosophy of essentialism narrative with full-width workshop imagery.
- Gazette Register: Newsletter subscription with validation and confirmation.

### FR-03: Catalog & Multi-Facet Filtering
- Category tabs: `Acoustic Architecture`, `Precision Instruments`, `Sculptural Lighting`, `Vegetable Tanned Leather`.
- Multi-facet price sorting (`Price: Low to High`, `Price: High to Low`, `Newest`, `Featured`).
- Active filter pill counter with one-click reset action.
- Zero-results empty state with quick reset CTA.

### FR-04: Product Detail Page (PDP)
- Left 7 columns: Large editorial gallery with thumbnail rail, high-res zoom framing, and image counter.
- Right 5 columns: Product title, subtitle, price, finish/variant selector with live hex swatches, quantity stepper, `Add to Bag`, and `Buy Now`.
- Accordion specifications: Technical specs, Materials & Origin, Dimensions, Shipping, and Returns.
- Interactive Acoustic Visualizer for audio instruments with real-time waveform frequency curves.
- Related products grid.

### FR-05: Slide-Over Cart Drawer
- Slide-over drawer with spring animation and backdrop blur.
- Live progress indicator towards complimentary express shipping ($300 threshold).
- Incremental quantity steppers, item removal, promo code engine (`ATELIER10`, `ARCHIVE20`), subtotal, tax, and direct checkout CTA.

### FR-06: Distraction-Free Checkout
- 5-step sequential flow: `01 Contact` → `02 Shipping` → `03 Payment` → `04 Review` → `05 Confirmation`.
- Delivery tier selection: Standard Curated Dispatch ($0/$25) or Priority Flight Express ($45).
- Packaging selection: Minimalist Recycled Carton vs Signature Monograph Box.
- Serialized order confirmation with printable dossier.

### FR-07: The Monograph Journal
- Long-form essays exploring industrial design reduction, beryllium acoustics, and vegetable-tanned leather.
- Drop caps, editorial blockquotes, and companion product acquisition spotlights.

---

## 3. Non-Functional & Quality Requirements
- **Performance:** 100% Next.js static and dynamic pre-rendering via Turbopack.
- **Accessibility:** WCAG AA contrast, visible focus rings, full keyboard traversal.
- **Type Safety:** Zero implicit `any` in TypeScript domain models.
- **Relational Integrity:** PostgreSQL + Prisma with 19 relational entities and foreign keys.
