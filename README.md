<div align="center">

# Rental

### Premium Office Spaces — Find. Book. Work.

A production-ready, bilingual web application for discovering and booking premium office spaces across the United States.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![next-intl](https://img.shields.io/badge/next--intl-4-8B5CF6)
![Tests](https://img.shields.io/badge/tests-32%20passing-22C55E)
![License](https://img.shields.io/badge/license-MIT-blue)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Internationalization](#internationalization)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)

---

## Overview

**Rental** is a Next.js application that lets users browse premium office listings, view detailed property pages with galleries and amenities, and initiate a booking flow — all in Spanish or English.

The project follows a layered architecture with a dedicated service layer, centralized types, CSS Modules with a design token system, and full i18n coverage via `next-intl`. It is structured to scale from the current static dataset to a real API backend with minimal friction.

---

## Features

- **Bilingual UI** — Spanish (default) and English, with locale-prefixed URLs (`/es/`, `/en/`)
- **Property listings** — Grid of office cards with rating, price, area and capacity
- **Property detail** — Hero image, info panel, amenities grid, photo gallery, and booking CTA
- **Responsive Navbar** — Mobile slide-in menu with social links and newsletter CTA
- **Contact form** — Validated workspace inquiry form with success state
- **Service layer** — All data access centralized through typed service functions
- **Type-safe routing** — All routes defined in a single constants file
- **Error & loading boundaries** — Global `error.tsx` and `loading.tsx` for all locale routes
- **Pre-commit hooks** — ESLint + Prettier enforced on every commit via Husky + lint-staged
- **32 unit tests** — Covering services, booking logic, and i18n utilities

---

## Tech Stack

| Layer      | Technology                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) — App Router                                                           |
| UI Library | [React 19](https://react.dev) with React Compiler                                                       |
| Language   | [TypeScript 5](https://www.typescriptlang.org) — strict mode                                            |
| i18n       | [next-intl 4](https://next-intl-docs.vercel.app)                                                        |
| Styling    | CSS Modules + CSS custom properties (no Tailwind)                                                       |
| Testing    | [Vitest 4](https://vitest.dev) + [Testing Library](https://testing-library.com)                         |
| Linting    | ESLint 9 flat config — `@next/eslint-plugin-next` + `@typescript-eslint`                                |
| Formatting | [Prettier 3](https://prettier.io)                                                                       |
| Git hooks  | [Husky 9](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) |

---

## Project Structure

```
rental/
├── public/
│   ├── icons/                      # SVG icon set (~30 icons)
│   └── images/                     # Office and building photos
│
└── src/
    ├── app/
    │   ├── layout.tsx              # Root layout: fonts, metadata, NextIntlClientProvider
    │   ├── page.tsx                # Root route → redirects to default locale
    │   └── [locale]/
    │       ├── layout.tsx          # Locale layout: Navbar + Footer
    │       ├── page.tsx            # Home page
    │       ├── error.tsx           # Global error boundary (client)
    │       ├── loading.tsx         # Global loading spinner (server)
    │       ├── not-found.tsx       # 404 page
    │       ├── property/[id]/      # Property detail (static generation)
    │       ├── booking/[id]/       # Booking start
    │       │   ├── checkout/       # Checkout step
    │       │   └── confirmation/   # Booking confirmed
    │       ├── search/             # Office listings  [coming soon]
    │       ├── about/              # About page       [coming soon]
    │       ├── contact/            # Contact page     [coming soon]
    │       ├── newsletter/         # Newsletter        [coming soon]
    │       └── terms/             # Terms & Conditions [coming soon]
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar/             # Responsive navbar with i18n + mobile menu
    │   │   └── Footer/             # Footer: quick links, discover, newsletter, social
    │   ├── sections/home/
    │   │   ├── HeroSection/        # Full-bleed hero with search card
    │   │   ├── TrustedBySection/   # Social proof headline
    │   │   ├── LogosSection/       # Company logos (desktop grid + mobile carousel)
    │   │   ├── FeaturedPropertiesSection/  # Filtered property card grid
    │   │   ├── OfficeSpotlightSection/     # Alternating split image/text cards
    │   │   ├── PeaceOfMindSection/         # Feature highlight cards
    │   │   └── WorkspaceInquirySection/    # Validated contact form (client)
    │   └── ui/
    │       ├── ComingSoonPage/     # Reusable placeholder for unbuilt routes
    │       ├── Container/          # Max-width wrapper with polymorphic `as` prop
    │       └── PropertyCard/       # Office listing card (image, meta, price, rating)
    │
    ├── data/
    │   └── properties.ts           # Static property + amenity dataset (8 properties)
    │
    ├── hooks/
    │   ├── useBookingType.ts       # Reads/validates booking period from URL params
    │   └── useSearchParams.ts      # Typed property search filter params (client)
    │
    ├── i18n/
    │   ├── routing.ts              # Supported locales + default locale config
    │   ├── request.ts              # Server-side locale resolution
    │   └── navigation.ts           # i18n-aware Link, redirect, usePathname
    │
    ├── lib/
    │   ├── api/client.ts           # Typed fetch wrapper: apiGet, apiPost, apiPatch, apiDelete
    │   ├── constants.ts            # NAV_ITEMS, FOOTER_*_LINKS, SOCIAL_LINKS, ROUTES, CONTACT_INFO
    │   └── i18n-utils.ts           # isValidLocale, resolveLocale
    │
    ├── messages/
    │   ├── en.json                 # English translations
    │   └── es.json                 # Spanish translations
    │
    ├── services/
    │   ├── propertyService.ts      # Data access + filtering for properties and amenities
    │   └── bookingService.ts       # Booking price calculation + submission
    │
    ├── styles/
    │   └── tokens.css              # CSS custom properties: colors, spacing, breakpoints, fonts
    │
    ├── test/
    │   └── setup.ts                # Global test setup: @testing-library/jest-dom
    │
    └── types/
        ├── common.ts               # Locale, PaginatedResult, ApiResult
        ├── property.ts             # Property, Amenity, PropertyFilters
        ├── booking.ts              # Booking, BookingFormValues, BookingPeriod, BookingStatus
        └── index.ts                # Barrel re-export
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20 LTS
- **npm** ≥ 10

### Install

```bash
git clone <repo-url>
cd rental
npm install
```

### Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route immediately redirects to your browser's preferred locale (`/es` or `/en`).

### Build for production

```bash
npm run build
npm start
```

---

## Available Scripts

| Script                  | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Start Next.js development server               |
| `npm run build`         | Build the application for production           |
| `npm run start`         | Start the production server                    |
| `npm run lint`          | Run ESLint across the codebase                 |
| `npm run lint:fix`      | Run ESLint with auto-fix                       |
| `npm run format`        | Format all files with Prettier                 |
| `npm run format:check`  | Check formatting without writing changes       |
| `npm run typecheck`     | Run TypeScript compiler check (`tsc --noEmit`) |
| `npm test`              | Run the full test suite once                   |
| `npm run test:watch`    | Run tests in interactive watch mode            |
| `npm run test:coverage` | Generate a coverage report (`html` + `text`)   |

---

## Architecture

### Layered data flow

Components never access raw data directly. All reads go through the service layer, which today is backed by a static dataset and tomorrow can be backed by an API — without touching any component.

```
Page / Component
      │
      ▼
Service layer          src/services/
  propertyService.ts   ─── getProperties(), getPropertyById(), resolveAmenities(), …
  bookingService.ts    ─── calculateBookingPrice(), submitBooking()
      │
      ▼
Data layer             src/data/properties.ts   (static, swap for API client later)
      │
      ▼
API client             src/lib/api/client.ts    (typed fetch wrapper, ready to use)
```

### Service API reference

**`propertyService.ts`**

```ts
import {
  getProperties, // All properties, optionally filtered by PropertyFilters
  getFeaturedProperties, // Properties for the home grid
  getPropertyById, // Single property by ID (undefined if not found)
  getAllPropertyIds, // All IDs — used in generateStaticParams
  getAmenities, // Full amenity catalog
  resolveAmenities, // string[] IDs → Amenity[] objects
} from "@/services/propertyService";

// Filter example
const results = getProperties({
  city: "new york",
  minPrice: 800,
  minCapacity: 4,
  available: true,
});
```

**`bookingService.ts`**

```ts
import {
  calculateBookingPrice, // (monthlyPrice, period, units) => number
  submitBooking, // (propertyId, formValues) => Promise<Booking>
} from "@/services/bookingService";

// Price example
const price = calculateBookingPrice(1200, "daily", 5); // 5 days at monthly rate

// Submit (currently a stub — replace internals with real API call)
const booking = await submitBooking("1", formValues);
```

### Centralized routing and navigation

Every route, link and social URL is defined once in `src/lib/constants.ts`. Import from there — never hardcode strings in components.

```ts
import { ROUTES, NAV_ITEMS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";

ROUTES.home; // "/"
ROUTES.property("3"); // "/property/3"
ROUTES.booking("3"); // "/booking/3"
ROUTES.checkout("3"); // "/booking/3/checkout"
ROUTES.confirmation("3"); // "/booking/3/confirmation"
```

### API client (ready for backend integration)

```ts
import { apiGet, apiPost, ApiError } from "@/lib/api/client";

try {
  const properties = await apiGet<Property[]>("/api/properties");
  const booking = await apiPost<Booking>("/api/bookings", payload);
} catch (err) {
  if (err instanceof ApiError) {
    console.error(err.status, err.message);
  }
}
```

Set `NEXT_PUBLIC_API_URL` to point to your backend (see [Environment Variables](#environment-variables)).

### Design token system

All visual constants live in `src/styles/tokens.css` as CSS custom properties. Reference them in any `.module.css` file:

```css
/* Colors */
--color-background    /* #FAFAFA */
--color-foreground    /* #171717 */
--color-primary       /* #171717 */
--color-muted         /* #73788C */
--color-border        /* #E5E5E5 */
--color-surface       /* #FFFFFF */

/* Spacing (rem scale) */
--space-2  --space-3  --space-4  --space-6  --space-8  --space-12

/* Breakpoints */
--bp-sm: 576px   --bp-md: 768px   --bp-lg: 992px   --bp-xl: 1200px

/* Container */
--container-max-width: 1366px
--container-padding-x: 1rem → 8rem (fluid, responsive)

/* Fonts */
--font-poppins            /* body / UI text    */
--font-plus-jakarta-sans  /* headings          */
--font-geist-sans         /* code / monospace  */
```

---

## Internationalization

The app supports **Spanish** (`es`, default) and **English** (`en`). The locale is always present in the URL (`/es/…`, `/en/…`). Locale detection is enabled — first-time visitors are redirected to their browser's preferred language.

### Translation file structure

Each namespace maps to a top-level key in the JSON files:

```
src/messages/
├── es.json    # Spanish (default locale)
└── en.json    # English

Namespaces: Navbar · Footer · HeroSection · TrustedBySection
            FeaturedPropertiesSection · OfficeSpotlightSection
            PeaceOfMindSection · WorkspaceInquirySection
            PropertyCard · PropertyDetail · NotFound · Error
```

### Using translations in components

**Server components** (the default in App Router):

```tsx
import { getTranslations } from "next-intl/server";

export default async function MySection() {
  const t = await getTranslations("MyNamespace");
  return <h2>{t("title")}</h2>;
}
```

**Client components** (`"use client"` directive):

```tsx
import { useTranslations } from "next-intl";

export default function MyForm() {
  const t = useTranslations("MyNamespace");
  return <button>{t("submit")}</button>;
}
```

**Interpolation:**

```tsx
// en.json: { "copyright": "© {year} Rental. All rights reserved." }
t("copyright", { year: new Date().getFullYear() });
```

### Adding a new locale

1. Add the locale code to `src/i18n/routing.ts`:
   ```ts
   locales: ["es", "en", "pt"],
   ```
2. Create `src/messages/pt.json` with all namespaces.
3. Rebuild — the middleware handles routing automatically.

---

## Testing

Tests are colocated next to their source files using the `*.test.ts` convention.

```bash
npm test                # Run all tests (CI mode)
npm run test:watch      # Interactive watch mode (development)
npm run test:coverage   # HTML + text coverage report → ./coverage/
```

### Current test suite

| Source file                   | Test file                 | Tests  |
| ----------------------------- | ------------------------- | ------ |
| `services/propertyService.ts` | `propertyService.test.ts` | 22     |
| `services/bookingService.ts`  | `bookingService.test.ts`  | 6      |
| `lib/i18n-utils.ts`           | `i18n-utils.test.ts`      | 4      |
| **Total**                     |                           | **32** |

### Writing a new test

```ts
// src/services/myService.test.ts
import { describe, it, expect } from "vitest";
import { myFunction } from "./myService";

describe("myFunction", () => {
  it("returns the expected value", () => {
    expect(myFunction("input")).toBe("expected output");
  });
});
```

Vitest is configured in `vitest.config.ts` with the `jsdom` environment and the `@/*` path alias — no extra setup required.

---

## Code Quality

### Pre-commit hook

Every `git commit` automatically runs lint-staged:

| File pattern          | Commands                            |
| --------------------- | ----------------------------------- |
| `*.{ts,tsx}`          | `eslint --fix` → `prettier --write` |
| `*.{css,json,md,mjs}` | `prettier --write`                  |

If any check fails, the commit is aborted. Fix the reported issues and commit again.

### Manual checks

```bash
npm run typecheck     # Zero TypeScript errors required
npm run lint          # Zero ESLint errors required
npm run format:check  # Zero Prettier diffs required
```

### ESLint configuration

The project uses ESLint 9's **native flat config** (`eslint.config.mjs`) with the `@next/eslint-plugin-next` plugin loaded directly — avoiding the `FlatCompat` circular-reference issue present when mixing ESLint 9+ with legacy shared configs.

Active rule sets:

- `@next/next` — recommended + core-web-vitals
- `@typescript-eslint` — `no-unused-vars`, `consistent-type-imports`, `no-explicit-any`

### TypeScript

`tsconfig.json` has `"strict": true` enabled. All shared types live in `src/types/` and are re-exported from `src/types/index.ts`.

---

## Environment Variables

| Variable              | Required | Default | Description                                                        |
| --------------------- | -------- | ------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_API_URL` | No       | `""`    | Base URL for the backend REST API. Empty string means same-origin. |

Create a `.env.local` file at the project root for local overrides (never commit this file):

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

When a real backend is connected, update `src/services/propertyService.ts` and `bookingService.ts` to call `apiGet`/`apiPost` from `src/lib/api/client.ts` instead of reading from the static dataset.

---

## Roadmap

The following pages render a "coming soon" placeholder (`ComingSoonPage` component) and are ready to be implemented:

| Route           | Status  | Notes                                                          |
| --------------- | ------- | -------------------------------------------------------------- |
| `/search`       | Planned | Filterable office listings grid using `getProperties(filters)` |
| `/about`        | Planned | Company story, team, mission                                   |
| `/contact`      | Planned | Dedicated contact page (form endpoint in `bookingService`)     |
| `/newsletter`   | Planned | Email subscription management                                  |
| `/terms`        | Planned | Legal documentation                                            |
| `/booking/[id]` | Planned | Full booking flow: date picker → checkout → confirmation       |

The booking flow pages (`booking`, `checkout`, `confirmation`) have correct metadata generation and React 19 async params — only the UI implementation is missing.

---

## License

MIT © Rental
