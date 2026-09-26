# ATELIER_ECOMMERCE

> **Atelier Privé** — A disciplined, high-end monochrome e-commerce experience inspired by luxury horology, acoustic engineering, and minimalist editorial design.

---

## Technical Architecture

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Runtime & UI**: React 19, TypeScript 5, Tailwind CSS 4
- **Animation & Kinetics**: Motion (`motion/react`)
- **Database & ORM**: PostgreSQL & Prisma ORM
- **State Management**: React Context & Custom Persistent Stores (Cart, Wishlist, Authenticated Session)
- **Payment Infrastructure**: Stripe Elements & Payment Intents API
- **Icons & Typography**: Lucide Icons, Geometrical Monospaced & Editorial Display Typography

---

## Core Features

1. **Cinematic Hero & 35mm Master Reel**:
   - Interactive numerical hotspot inspection pins `[01, 02, 03]` with dynamic spec overlays.
   - Live stream 4K monochrome video reels with scroll-driven parallax and scale reveals.
   - Built-in Web Audio API 55Hz acoustic synthesizer drone and live timecode display.

2. **Curated Luxury Catalog (24 Objects)**:
   - **Acoustic Architecture**: Planar magnetic monitors, R-2R ladder DACs, cryo-treated silver litz cabling.
   - **Precision Instruments**: Ceramic mechanical chronometers, titanium calipers, basalt stone catchalls.
   - **Sculptural Lighting**: Carved Spanish alabaster cylinders, sand-cast bronze wall sconces, K9 optical crystal pendants.
   - **Vegetable Tanned Leather**: Tuscan bridle writing blotters, magnetic cable wraps, titanium modular shackles.

3. **Private Portfolio & Wishlist System**:
   - Header heartbeat counter with slide-over drawer preview.
   - 1-click "Move to Bag" portfolio valuation calculator.

4. **Frictionless Authenticated Checkout**:
   - Automatic recognition for identified Atelier Privé members (`Marcus Vance`).
   - Auto-populated delivery coordinates and auto-advance past redundant contact forms.

5. **Acoustic Comparison Matrix & Serial Verification**:
   - Direct side-by-side technical specification comparison.
   - Serial number authenticity registry and provenance certificate verification.

---

## Getting Started

### 1. Installation
```bash
pnpm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Database Migration & Seeding
```bash
npx prisma migrate dev
pnpm db:seed
```

### 4. Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the atelier.
