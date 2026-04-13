# Rental — Premium Office Spaces

A modern, production-ready web application for discovering and booking premium office spaces across the United States. Built with **Next.js 16**, **React 19**, and **next-intl** for full bilingual (EN/ES) support.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Internationalization](#internationalization)
- [Testing](#testing)
- [Code Quality](#code-quality)

---

## Tech Stack

| Layer      | Technology                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) — App Router                                                         |
| UI Library | [React 19](https://react.dev)                                                                         |
| Language   | [TypeScript 5](https://www.typescriptlang.org) — strict mode                                          |
| i18n       | [next-intl 4](https://next-intl-docs.vercel.app)                                                      |
| Styling    | CSS Modules + CSS custom properties                                                                   |
| Testing    | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com)                         |
| Linting    | ESLint 9 (flat config) + `@next/eslint-plugin-next`                                                   |
| Formatting | [Prettier](https://prettier.io)                                                                       |
| Git hooks  | [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — fonts, metadata, NextIntlClientProvider
│   ├── page.tsx                    # Root route — redirects to default locale
│   └── [locale]/
│       ├── layout.tsx              # Locale layout — Navbar + Footer
│       ├── page.tsx                # Home page
│       ├── error.tsx               # Global error boundary
│       ├── loading.tsx             # Global loading state
│       ├── not-found.tsx           # 404 page
│       ├── property/[id]/          # Property detail page
│       ├── booking/[id]/           # Booking flow (start → checkout → confirmation)
│       ├── search/                 # Office listings (coming soon)
│       ├── about/                  # About page (coming soon)
│       ├── contact/                # Contact page (coming soon)
│       ├── newsletter/             # Newsletter page (coming soon)
│       └── terms/                  # Terms & Conditions (coming soon)
│
├── components/
│   ├── layout/
│   │   ├── Navbar/                 # Responsive navbar with mobile menu
│   │   └── Footer/                 # Footer with links, newsletter, social
│   ├── sections/
│   │   └── home/
│   │       ├── HeroSection/        # Hero with search card
│   │       ├── TrustedBySection/   # Social proof headline
│   │       ├── LogosSection/       # Company logos carousel
│   │       ├── FeaturedPropertiesSection/  # Property grid with filter buttons
│   │       ├── OfficeSpotlightSection/     # Split image/text cards
│   │       ├── PeaceOfMindSection/         # Feature cards
│   │       └── WorkspaceInquirySection/    # Contact form
│   └── ui/
│       ├── ComingSoonPage/         # Reusable placeholder for unbuilt pages
│       ├── Container/              # Max-width wrapper with semantic `as` prop
│       └── PropertyCard/           # Office listing card
│
├── data/
│   └── properties.ts               # Static property + amenity dataset
│
├── hooks/
│   ├── useBookingType.ts           # Reads booking type from URL search params
│   └── useSearchParams.ts          # Typed property search filter params
│
├── i18n/
│   ├── routing.ts                  # Locale configuration (es, en)
│   ├── request.ts                  # Server-side locale resolution
│   └── navigation.ts               # i18n-aware Link and redirect helpers
│
├── lib/
│   ├── api/
│   │   └── client.ts               # Typed fetch wrapper (apiGet, apiPost, …)
│   ├── constants.ts                # Nav items, footer links, social links, routes
│   └── i18n-utils.ts               # isValidLocale, resolveLocale
│
├── messages/
│   ├── en.json                     # English translations
│   └── es.json                     # Spanish translations
│
├── services/
│   ├── propertyService.ts          # Data access layer for properties + amenities
│   └── bookingService.ts           # Booking logic + price calculation
│
├── styles/
│   └── tokens.css                  # Global CSS custom properties (colors, spacing, breakpoints)
│
├── test/
│   └── setup.ts                    # Vitest + Testing Library global setup
│
└── types/
    ├── common.ts                   # Locale, PaginatedResult, ApiResult
    ├── property.ts                 # Property, Amenity, PropertyFilters
    ├── booking.ts                  # Booking, BookingFormValues, BookingPeriod
    └── index.ts                    # Barrel re-export
```

---

## Getting Started

### Prerequisites

- **Node.js** 20 or later
- **npm** 10 or later

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd rental

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app redirects to your browser's preferred locale (`/es` or `/en`).

---

## Available Scripts

| Script                  | Description                                   |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Start development server                      |
| `npm run build`         | Build for production                          |
| `npm run start`         | Start production server                       |
| `npm run lint`          | Run ESLint                                    |
| `npm run lint:fix`      | Run ESLint with auto-fix                      |
| `npm run format`        | Format all files with Prettier                |
| `npm run format:check`  | Check formatting without writing              |
| `npm run typecheck`     | Run TypeScript type-checking (`tsc --noEmit`) |
| `npm test`              | Run test suite once                           |
| `npm run test:watch`    | Run tests in watch mode                       |
| `npm run test:coverage` | Run tests with coverage report                |

---

## Architecture

### Data Flow

All data access is centralized through the **service layer** — components never import from `src/data/` directly.

```
Component
  └── Service (src/services/)
        └── Data layer (src/data/properties.ts)
              └── [Future: API via src/lib/api/client.ts]
```

### Key services

**`propertyService.ts`**

```ts
getProperties(filters?)      // All properties, optionally filtered
getFeaturedProperties()      // Properties shown on the home grid
getPropertyById(id)          // Single property lookup
getAllPropertyIds()           // All IDs for generateStaticParams
getAmenities()               // Full amenity catalog
resolveAmenities(ids)        // IDs → Amenity objects
```

**`bookingService.ts`**

```ts
calculateBookingPrice(monthlyPrice, period, units); // Price calculation
submitBooking(propertyId, formValues); // Submit booking (stub → API)
```

### Navigation & Routes

All routes, nav items, footer links, and social links are defined in a single file:

```ts
// src/lib/constants.ts
import { ROUTES, NAV_ITEMS, FOOTER_QUICK_LINKS, SOCIAL_LINKS } from "@/lib/constants";

ROUTES.property("1"); // "/property/1"
ROUTES.booking("1"); // "/booking/1"
ROUTES.checkout("1"); // "/booking/1/checkout"
ROUTES.confirmation("1"); // "/booking/1/confirmation"
```

### API Client

When a backend is available, use the typed fetch wrapper:

```ts
// src/lib/api/client.ts
import { apiGet, apiPost } from "@/lib/api/client";

const properties = await apiGet<Property[]>("/api/properties");
const booking = await apiPost<Booking>("/api/bookings", payload);
```

Set the `NEXT_PUBLIC_API_URL` environment variable to point to your API origin.

---

## Internationalization

The app supports **Spanish** (`es`, default) and **English** (`en`). The locale prefix is always shown in the URL (`/es/...`, `/en/...`).

### Translation files

```
src/messages/
├── es.json   # Spanish (default locale)
└── en.json   # English
```

### Using translations

**Server components** (default):

```tsx
import { getTranslations } from "next-intl/server";

export default async function MyComponent() {
  const t = await getTranslations("MyNamespace");
  return <h1>{t("title")}</h1>;
}
```

**Client components** (`"use client"`):

```tsx
import { useTranslations } from "next-intl";

export default function MyClientComponent() {
  const t = useTranslations("MyNamespace");
  return <button>{t("submit")}</button>;
}
```

### Adding a new locale

1. Add the locale code to `src/i18n/routing.ts`
2. Create `src/messages/<locale>.json`
3. Rebuild

---

## Testing

Tests are colocated with their source files (`*.test.ts`).

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report (html + text)
```

### Test coverage

| File                 | Tests | Coverage target |
| -------------------- | ----- | --------------- |
| `propertyService.ts` | 22    | Services        |
| `bookingService.ts`  | 6     | Services        |
| `i18n-utils.ts`      | 4     | Lib             |

### Writing tests

```ts
import { describe, it, expect } from "vitest";
import { getPropertyById } from "@/services/propertyService";

describe("getPropertyById", () => {
  it("returns the correct property", () => {
    const property = getPropertyById("1");
    expect(property?.id).toBe("1");
  });
});
```

---

## Code Quality

### Pre-commit hook

On every `git commit`, lint-staged runs automatically:

- **`*.{ts,tsx}`** → ESLint (auto-fix) + Prettier
- **`*.{css,json,md,mjs}`** → Prettier

### Type checking

```bash
npm run typecheck
```

TypeScript is configured in strict mode. All types are centralized in `src/types/`.

### CSS conventions

Global design tokens are defined as CSS custom properties in `src/styles/tokens.css`:

```css
--color-primary       /* #171717 */
--color-muted         /* #73788C */
--color-border        /* #E5E5E5 */
--space-4             /* 1rem    */
--container-max-width /* 1366px  */
--font-poppins        /* Poppins variable */
--font-plus-jakarta-sans
```

Each component has its own `*.module.css` file. No Tailwind CSS — styling is done exclusively via CSS Modules and the token system above.

---

## Environment Variables

| Variable              | Required | Description                                                   |
| --------------------- | -------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | No       | Base URL for the backend API. Defaults to `""` (same origin). |

Create a `.env.local` file at the project root to set local overrides:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
```
