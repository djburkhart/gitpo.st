'use client'

import { use } from 'react'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Link } from '@/components/catalyst/link'
import { GitBranch, Star, GitFork } from 'lucide-react'

interface RepoLayoutProps {
  children: React.ReactNode
  params: Promise<{ name: string }>
}

const tabs = [
  { name: 'Code', href: '' },
  { name: 'Commits', href: '/commits' },
  { name: 'Branches', href: '/branches' },
  { name: 'Pipelines', href: '/pipelines' },
  { name: 'Settings', href: '/settings' },
]

export default function RepoLayout({ children, params }: RepoLayoutProps) {
  const { name } = use(params)

  // In a real app this would come from data
  const repo = {
    name,
    description: name === 'api-gateway' 
      ? 'Main API gateway service for all microservices' 
      : name === 'web-app' 
        ? 'Frontend application built with Next.js' 
        : 'Repository description goes here',
    visibility: name === 'docs' ? 'Public' : 'Private',
    stars: 42,
    forks: 7,
    defaultBranch: 'main',
  }

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
  const basePath = `/repositories/${name}`

  return (
    <div className="space-y-6">
      {/* Repo Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            {repo.name}
          </h1>
          <Badge color={repo.visibility === 'Private' ? 'zinc' : 'blue'}>
            {repo.visibility}
          </Badge>
        </div>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">{repo.description}</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            <Star className="size-4" />
            <span>{repo.stars}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            <GitFork className="size-4" />
            <span>{repo.forks}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            <GitBranch className="size-4" />
            <span>{repo.defaultBranch}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button plain>Watch</Button>
            <Button plain>Fork</Button>
            <Button color="dark">Clone</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-200 dark:border-white/10">
        <nav className="-mb-px flex gap-6">
          {tabs.map((tab) => {
            const href = tab.href ? `${basePath}${tab.href}` : basePath
            const isActive = currentPath === href || (tab.href === '' && currentPath === basePath)

            return (
              <Link
                key={tab.name}
                href={href}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-zinc-950 text-zinc-950 dark:border-white dark:text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                }`}
              >
                {tab.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Page Content */}
      <div>{children}</div>
    </div>
  )
}
