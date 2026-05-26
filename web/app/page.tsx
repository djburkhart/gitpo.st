import Link from 'next/link'
import { Button } from '@/components/catalyst/button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
              <span className="font-mono text-lg font-bold tracking-[-1.5px]">gp</span>
            </div>
            <div className="text-xl font-semibold tracking-tight">gitpo.st</div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
              Dashboard
            </Link>
            <Button href="/dashboard" color="dark" className="text-sm">Get started</Button>
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium tracking-widest text-zinc-600 dark:bg-white/10 dark:text-zinc-400">
            EARLY ACCESS
          </div>
          <h1 className="mt-6 text-6xl font-semibold tracking-tighter text-balance text-zinc-950 dark:text-white">
            Git and CI/CD that just works<br />together on Google Cloud.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
            A modern, unified self-hosted platform combining Gogs and GoCD — beautifully designed for teams on GCP.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Button href="/dashboard" color="dark" size="xl">
              Open Dashboard
            </Button>
            <Button href="https://github.com/djburkhart/gitpo.st" variant="outline" size="xl">
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
