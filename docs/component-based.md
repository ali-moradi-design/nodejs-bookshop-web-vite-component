# Component-based architecture

This storefront follows a classic **Component-based** React SPA layout: reusable UI components are the primary unit of organization (not vertical feature slices, not Clean Architecture layers, and not Atomic Design atoms/molecules).

## Layout

```
src/
  app/           # Bootstrap: providers, router, global styles
  components/    # ALL reusable UI — one PascalCase folder per component (colocation)
  containers/    # Smart/data-connected wrappers that compose components + hooks
  pages/         # Route screens — thin composition of containers/components
  hooks/         # Shared React hooks (data + UI)
  services/      # API clients / HTTP modules by domain (no UI)
  store/         # Client state (e.g. auth Zustand store)
  types/         # Shared TypeScript types
  utils/         # Pure helpers (cn, formatters, parsers)
  i18n/          # Translations
  config/        # Env + theme tokens
```

## Component vs container

| Kind          | Role                                                  | Rules                                                                           |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Component** | Presentational / reusable UI under `components/Name/` | Prefer props in; colocate `Name.tsx`, optional stories/tests, public `index.ts` |
| **Container** | Wires hooks + services to components                  | Owns data fetching / mutations for a screen or complex section                  |
| **Page**      | Route entry only                                      | Compose containers/components; minimal logic                                    |

Example:

```tsx
// pages/CatalogPage.tsx
import { CatalogContainer } from '@/containers/CatalogContainer';
export function CatalogPage() {
  return <CatalogContainer />;
}
```

## Where API lives

| Concern                       | Location                                    |
| ----------------------------- | ------------------------------------------- |
| HTTP client, `ApiError`       | `services/http/`                            |
| Domain REST modules           | `services/<domain>/` (book, cart, order, …) |
| React Query hooks & mutations | `hooks/`                                    |
| Auth session store            | `store/auth-store.ts`                       |
| Shared types                  | `types/`                                    |

**Services must not contain React UI.** Components and containers consume hooks; hooks call services.

## Public exports

Each `components/<Name>/` folder exposes an `index.ts` barrel. Prefer:

```ts
import { Button } from '@/components/Button';
import { BookCard } from '@/components/BookCard';
import { CatalogContainer } from '@/containers/CatalogContainer';
import { useBooksQuery } from '@/hooks';
import { fetchBook } from '@/services/book';
```

## Path aliases

- `@/components/*`, `@/containers/*`, `@/pages/*`
- `@/hooks/*`, `@/services/*`, `@/app/*`
- `@/types/*`, `@/utils/*`, `@/config/*`, `@/i18n/*`, `@/store/*`

## Enforcement

```bash
pnpm check:architecture
```

Fails when:

- Expected folders are missing
- `src/features` (or FSD `entities`/`widgets`/`shared`) still exists
- Atomic Design layer folders appear under `components/`
- Legacy `@/features` / `@/shared` imports remain
- Component folders are not PascalCase or lack `index.ts`

Optionally warns when `pages/` import `@/services/*` directly (containers/hooks should mediate).

## What we deliberately avoid

- Top-level `src/features/*` vertical slices as the architecture root
- Atomic Design `atoms` / `molecules` / `organisms` folders
- Clean Architecture `domain` / `application` / `infrastructure` trees

## UI kit primitives

Low-level presentational building blocks live as individual folders under `components/`:

Button, Input, Label, Textarea, Card, Badge, Skeleton, Separator, Select, Dialog,
DropdownMenu, Table, Spinner/PageLoader, EmptyState, Alert, Slider, Sheet,
DataTable, KpiCards, KokonutButton, BeamsBackground.

Optional aggregate: `import { Button, Card } from '@/components/ui-kit'`.
