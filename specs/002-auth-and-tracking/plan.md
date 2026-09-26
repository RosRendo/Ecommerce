# Implementation Plan: Complete Enterprise Ecommerce Suite

**Feature ID:** SPEC-002  
**Feature Directory:** `specs/002-auth-and-tracking`  
**Status:** Approved / In Progress  
**Execution Strategy:** Phased Systematic Sprints  
**Architecture:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4 + Prisma/NestJS

---

## 1. Technical Architecture & State Flow

```mermaid
graph TD
    Client[Browser Client: Next.js 16 App Router] --> AuthCtx[AuthContext Session Store]
    Client --> CartCtx[Cart & Currency Store]
    Client --> ReturnPortal[Returns RMA State Machine]
    Client --> TrackPortal[Milestone Timeline Engine]
    
    AuthCtx -->|Session Token / Profile| LocalStorage[(Browser Local Storage)]
    TrackPortal -->|Milestones / Carrier Data| MockAPI[Orders & Shipments Provider]
    ReturnPortal -->|RMA Slip & PDF Label| ReturnEngine[Return Processor]
    
    Client -->|App Router Routes| Pages
    subgraph Pages
        P_Auth[/login & /register]
        P_Track[/track - Chronological Timeline]
        P_Returns[/returns - RMA Self-Service]
        P_Shipping[/shipping - Transparent Dispatches]
        P_Reviews[PDP ProductReviews Component]
        P_Waitlist[Back-in-Stock Modal]
        P_Compare[/compare - Specs Matrix]
        P_FAQ[/faq - Searchable Accordions]
        P_Contact[/contact - Concierge Form]
        P_Verify[/verify - Serial Provenance]
        P_Admin[/admin - Merchant Operations]
    end
```

---

## 2. Sprint 1 Architecture: Identity & Post-Purchase Hub

### 2.1 Authentication & Session Context (`src/lib/store/auth-store.tsx`)
- State: `user: UserProfile | null`, `isAuthenticated: boolean`, `token: string | null`.
- Methods: `login(email, password)`, `register(name, email, password)`, `logout()`.
- Default pre-seeded profile: Marcus Vance (`marcus.vance@atelier-prive.com`, Tier: Privé Member No. 0429).
- Integration in `src/components/navigation/Header.tsx`:
  - Unauthenticated: Render "Sign In" link leading to `/login` or opening the slide-over modal.
  - Authenticated: Render "Account (Marcus)" with hover dropdown or direct link to `/account` + "Sign Out" button.

### 2.2 Chronological Milestone Shipment Tracker (`src/app/track/page.tsx` & `src/features/tracking/MilestoneTimeline.tsx`)
- Route: `/track`
- Input: Accepts `Order Number` (e.g. `ATL-2026-891024`) or tracking code (e.g. `DHL-892410-CH`). Also supports query parameter `?order=ATL-2026-891024`.
- Constraint: **STRICTLY NO MAPS**. Clean, high-contrast, editorial vertical timeline.
- Milestones data structure:
  - Timestamp, status title, location (Zurich, Leipzig Hub, Local Dispatch), and completion flag.
  - Current active step features an elegant minimal pulsing indicator and estimated delivery window.

### 2.3 Self-Service Returns & RMA Portal (`src/app/returns/page.tsx`)
- Route: `/returns`
- Step 1: Order lookup by Order Reference + Email.
- Step 2: Select return item, reason (Acoustic Preference, Ergonomic Fit, Finish Mismatch), and resolution (Exchange for Variant vs Refund).
- Step 3: Confirmation with generated RMA Code (`RMA-2026-XXXX`) and prepaid courier instructions.

### 2.4 Shipping & Logistics Transparency Hub (`src/app/shipping/page.tsx`)
- Route: `/shipping`
- Explains express diplomatic corridors, duties pre-paid guarantee (DDP), insured transit, and white-glove unboxing.

---

## 3. Sprint 2 Architecture: Social Proof, Merchandising & Retention

### 3.1 Product Reviews & Ratings (`src/features/reviews/ProductReviews.tsx`)
- Embedded into PDP ([src/app/product/[slug]/page.tsx](file:///d:/FOR%20RENDO%20(ONLY%20)/Ecommerce/Ecommerce/src/app/product/%5Bslug%5D/page.tsx)).
- Displays aggregate rating (4.9/5), star breakdown, verified owner badges, and filter tabs.
- "Submit Evaluation" dialog allowing customers to leave a rating and review text.

### 3.2 Back-in-Stock & Limited Waitlist (`src/features/products/WaitlistModal.tsx`)
- For out-of-stock variants or limited edition drops, triggers a waitlist modal capturing email and notification preferences.

### 3.3 Technical Product Comparison Matrix (`src/app/compare/page.tsx`)
- Side-by-side comparison matrix across acoustic parameters (Frequency response, transducer type, materials, weight, wireless protocol).

---

## 4. Sprint 3 Architecture: Customer Care & Provenance

### 4.1 Help Center & Categorized FAQ (`src/app/faq/page.tsx`)
- Interactive Radix UI accordions categorized by Shipping, Returns, Warranties, Sound Engineering, and Payments.
- Real-time search filter.

### 4.2 Support & Concierge Inquiries (`src/app/contact/page.tsx`)
- Direct contact form with inquiry categories, direct telephone lines, and global atelier coordinates.

### 4.3 Serial Number Authenticity Checker (`src/app/verify/page.tsx`)
- Input serial number (e.g. `SN-AETH-01-0492`, `SN-MNLT-02-0104`).
- Renders an interactive Certificate of Authenticity with verified production batch and master craftsman sign-off.

---

## 5. Sprint 4 Architecture: Merchant Operations & Admin Console

### 5.1 Admin Console (`src/app/admin/page.tsx`)
- Overview KPI cards: Gross Revenue, Active Orders, Average Order Value (AOV), Return Rate.
- Orders Fulfillment Table: Update order status (`PENDING` -> `PROCESSING` -> `SHIPPED`), add carrier tracking code.
- Inventory Management: Stock levels, quick +/- adjustment, low-inventory warning.
- Promo Codes: Active coupon listing, redemption stats, create new discount code.

---

## 6. Implementation Quality Gates
1. Strict adherence to Monochrome Palette tokens (`#FFFFFF` to `#000000`).
2. All interactive components support keyboard navigation and ARIA semantics.
3. Turbopack build compilation (`pnpm build`) must pass without errors.
