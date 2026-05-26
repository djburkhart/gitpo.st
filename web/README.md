# gitpo.st Web UI

Modern frontend for gitpo.st built with:

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Headless UI**
- **Catalyst UI Kit** (Tailwind Labs component library — see License section below)

## Getting started

```bash
cd web
npm install
npm run dev
```

Then open http://localhost:3000

The dashboard is available at `/dashboard` (uses a route group).

## Project Structure

```
web/
├── app/
│   ├── (app)/              # Protected dashboard area (uses SidebarLayout)
│   │   ├── dashboard/
│   │   ├── repositories/
│   │   ├── pipelines/
│   │   ├── settings/
│   │   └── layout.tsx
│   ├── layout.tsx
│   └── page.tsx            # Public landing page
├── components/
│   ├── app-sidebar.tsx     # Custom gitpo.st sidebar
│   └── catalyst/           # Catalyst UI Kit components (see License section)
├── ...
```

## Design Goals

- Beautiful, fast, and consistent experience for Git + CI/CD
- Strong Google Cloud / GKE aesthetics
- Excellent dark mode support
- Highly composable using the excellent primitives from Catalyst + Headless UI

## Connecting to Backend

Currently the UI is static/demo data only.

Planned integrations:
- `gitpo.st-hub` (Go) for unified dashboard data
- Gogs API (repos, webhooks, users)
- GoCD API (pipelines, builds, agents)

## License & Catalyst UI Kit

The UI is designed around the excellent **Catalyst UI Kit** from Tailwind Labs (part of Tailwind Plus).

**Important:** The Catalyst components are commercial software and are **not open source**.

### How to set up Catalyst locally

1. Purchase a Tailwind Plus license (https://tailwindcss.com/plus)
2. Download the Catalyst UI Kit
3. Copy the TypeScript components into this folder:
   ```
   web/components/catalyst/
   ```
4. Install the required dependencies (already in package.json):
   ```bash
   npm install @headlessui/react motion clsx
   ```

The `components/catalyst/` directory is **gitignored** and should never be committed to this repository.

This approach keeps us compliant with the Tailwind Plus license while still allowing licensed users to build a high-quality interface.

If you do not have a Tailwind Plus license, you can still run the project — the Catalyst components will simply be missing until you add them. We may explore fully open-source alternatives (such as shadcn/ui) in the future for better contributor accessibility.
