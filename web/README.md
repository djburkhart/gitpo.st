# gitpo.st Web UI

Modern frontend for gitpo.st built with:

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Headless UI**
- **Catalyst UI Kit** (Tailwind Labs component library)

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
│   ├── (app)/              # Protected dashboard area
│   │   ├── dashboard/
│   │   ├── repositories/
│   │   ├── pipelines/
│   │   ├── settings/
│   │   └── layout.tsx      # Uses AppSidebar + Catalyst SidebarLayout
│   ├── layout.tsx
│   └── page.tsx            # Public landing page
├── components/
│   └── catalyst/           # Copied from Catalyst UI Kit (typescript version)
├── ...
```

## Using Catalyst Components

All components are in `components/catalyst/`. They are designed to be copied and customized.

Example:

```tsx
import { Button } from '@/components/catalyst/button'
import { Input } from '@/components/catalyst/input'
import { Field, Label } from '@/components/catalyst/fieldset'
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

## License Note

The Catalyst components are from Tailwind UI Plus and are used under the license purchased by the team.
