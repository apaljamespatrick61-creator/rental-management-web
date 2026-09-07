# Copilot Instructions for rental-management-web

Use these rules when generating or editing code in this repository.

## Tech Stack and Baseline
- Framework: Next.js 16 App Router, React 19, TypeScript strict mode.
- Styling: Tailwind CSS v4 utility classes.
- Data fetching/state: Axios + TanStack React Query.
- Forms/validation: React Hook Form + Zod.
- Notifications: sonner toast.
- Global client state: Zustand.

## Important Next.js Rule
- This repo uses Next.js 16 and may differ from older conventions.
- Before introducing new Next.js APIs or patterns, verify docs in `node_modules/next/dist/docs/` and avoid deprecated APIs.

## Project Structure Conventions
- Route files live under `app/` using route groups such as `(app)` and `(auth)`.
- Feature logic lives under `src/features/<feature-name>/` and is split into:
  - `api/` for request functions.
  - `hooks/` for React Query and feature hooks.
  - `schema/` for Zod schemas and inferred form types.
  - `components/` for UI.
- Shared cross-feature code lives in `src/shared/` (axios, store, shared components, utils, types).

## Imports and Paths
- Prefer `@/*` path alias imports for shared and cross-folder imports.
- Keep imports type-safe with `import type` for types where possible.

## API Layer Patterns
- Use the shared axios client in `src/shared/lib/axios.ts`.
- Add API request functions in feature `api/` files.
- Request function naming should follow existing pattern: `<action><Entity>Request` (example: `addTenantRequest`, `updateTenantRequest`).
- Keep API wrappers thin; avoid UI concerns inside API files.

## React Query Patterns
- Place query/mutation hooks inside feature `hooks/` folders.
- Use names like `useGet<Entity>Query` and `useAdd<Entity>Mutation`.
- Return named objects from hooks (example: `{ addTenantMutation }`, `{ getTenantsQuery }`) to match current usage style.
- Keep `queryKey` values consistent between queries and invalidations for the same resource.

## Form and Validation Patterns
- Define Zod schema in `schema/` and export inferred `FormValues` types.
- Use `zodResolver(schema)` with `useForm<FormValues>()` in form components.
- Show field-level validation messages from `formState.errors`.
- Keep forms and modals as client components (`"use client"`).

## UI and Component Patterns
- Prefer function components with typed props interfaces.
- Keep existing Tailwind style approach and class naming patterns.
- Reuse shared UI components in `src/shared/components/` when possible.

## Error Handling and UX
- Surface async success/error feedback with sonner toasts.
- For mutation errors, map backend error messages safely and provide fallback text.
- Avoid swallowing errors silently.

## Auth and State
- Use Zustand store in `src/shared/store/useAuthStore.ts` for auth state transitions.
- Keep auth API logic in feature API/hook files, not in presentational components.

## Environment and Security
- Base API URL comes from `NEXT_PUBLIC_API_BASE_URL`.
- Never hardcode secrets, tokens, or private credentials.
- Keep `.env*` files out of version control.

## Code Quality
- Keep changes scoped and minimal; do not refactor unrelated files.
- Preserve existing naming and folder conventions unless explicitly asked to change them.
- Run lint for changed code paths when relevant.

## What to Avoid
- Do not move feature code into route files unless it is route-specific composition.
- Do not introduce a new state/data-fetching library.
- Do not mix server-only APIs into client components.
