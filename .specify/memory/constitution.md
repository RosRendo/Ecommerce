# ATELIER Project Constitution

## Core Principles

### I. Strict Monochrome Aesthetics (NON-NEGOTIABLE)
The design system must strictly adhere to the curated monochrome palette:
`#FFFFFF`, `#FAFAFA`, `#F5F5F5`, `#E5E5E5`, `#A3A3A3`, `#525252`, `#171717`, `#000000`.
- Prohibited: Gradients, colorful accents, neon tones, glassmorphism, heavy drop-shadows, and large pill-shaped UI wrappers.
- Required: 1px hairline borders (`#E5E5E5`), stark contrasts, high-contrast imagery, and visual calm.

### II. Editorial Typography & 12-Column Grid
Typography provides the visual personality.
- Primary typeface: Precision geometric sans-serif (Geist Sans).
- Headings: Light weights (`font-light`), tight letter-spacing for large titles (`tracking-[0.04em]`).
- Labels & Overlines: Uppercase tracking (`tracking-[0.18em]` to `tracking-[0.3em]`) with micro-sizes (10px–11px).
- Desktop layout: Responsive 12-column grid constrained to max-width 1280–1440px with generous whitespace.
- Mobile layout: Preserve visual hierarchy, prioritize product photography and clean purchasing drawers.

### III. Spec-Driven Architecture & Feature Modularity
Code must be structured into modular domain features rather than monolithic files:
- `src/features/products`: Product cards, galleries, filters, and acoustic visualizers.
- `src/features/cart`: Persistent slide-over cart drawer and promotions engine.
- `src/features/checkout`: Distraction-free 5-step checkout flow.
- `src/features/account`: Order tracking, certificates, portfolio, and concierge.
- `src/features/collections`: Thematic lookbook experiences.
- `backend/src/`: Modular NestJS architecture (auth, users, products, categories, inventory, cart, orders, payments, shipping, reviews, admin).

### IV. Subtle Motion & Reduced Interaction Noise
Animations exist solely to communicate state and spatial hierarchy:
- Transition duration: 150ms to 250ms cubic-bezier.
- Hover scaling: Capped at 1.02x (`group-hover:scale-[1.02]`).
- Prohibited: Bouncing effects, excessive parallax, flashing cards, or animations on every element.
- Accessibility: Full compliance with `prefers-reduced-motion`.

### V. Type Safety, Relational Integrity & Verification
- Strict TypeScript: No implicit `any`. Explicit domain interfaces in `src/types/index.ts`.
- Relational Schema: PostgreSQL + Prisma (`prisma/schema.prisma`) maintaining cascading foreign keys, indexes, and soft deletions.
- Production Build Verification: Every feature must pass Next.js static build (`pnpm build`) and linting without errors.

## Technical Standards & Quality Gates

1. **Accessibility (WCAG AA)**: Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`), keyboard navigation (`⌘K` search, escape to dismiss), and visible focus rings.
2. **Distraction-Free Purchasing**: Header and footer must automatically hide on `/checkout`.
3. **Responsive Execution**: All pages must render cleanly across mobile (375px), tablet (768px), and desktop (1280px–1440px).

## Governance
This constitution acts as the supreme architectural rulebook for all Spec Kit workflows (`/speckit-specify`, `/speckit-plan`, `/speckit-tasks`, `/speckit-implement`). Any amendment must be documented and verified against the core aesthetic.

**Version**: 1.0.0 | **Ratified**: 2026-09-26 | **Last Amended**: 2026-09-26
