'use client'

import { use, useState } from 'react'
import { Heading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import { Button } from '@/components/catalyst/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'
import { Badge } from '@/components/catalyst/badge'
import { Folder, FileText, GitBranch } from 'lucide-react'
import Link from 'next/link'
import { MarkdownRenderer } from '@/components/markdown-renderer'

interface RepoPageProps {
  params: Promise<{ name: string }>
}

// Nested file tree structure for realistic browsing
type FileNode = {
  name: string
  type: 'file' | 'folder'
  lastCommit: string
  updated: string
  children?: FileNode[]
}

const fileTree: FileNode[] = [
  {
    name: '.github',
    type: 'folder',
    lastCommit: 'Update workflows',
    updated: '2h ago',
    children: [
      { name: 'workflows', type: 'folder', lastCommit: 'CI improvements', updated: '2h ago' },
      { name: 'dependabot.yml', type: 'file', lastCommit: 'Update dependencies', updated: '1d ago' },
    ],
  },
  {
    name: 'src',
    type: 'folder',
    lastCommit: 'Refactor auth module',
    updated: 'yesterday',
    children: [
      { name: 'app', type: 'folder', lastCommit: 'Add new routes', updated: 'yesterday' },
      { name: 'components', type: 'folder', lastCommit: 'UI updates', updated: '3d ago' },
      { name: 'lib', type: 'folder', lastCommit: 'Add utils', updated: '1w ago' },
    ],
  },
  { name: 'README.md', type: 'file', lastCommit: 'Update installation steps', updated: '3d ago' },
  { name: 'package.json', type: 'file', lastCommit: 'Bump dependencies', updated: '1w ago' },
  { name: 'tsconfig.json', type: 'file', lastCommit: 'Initial commit', updated: '2w ago' },
  { name: '.gitignore', type: 'file', lastCommit: 'Initial commit', updated: '2w ago' },
]

const mockReadme = (repoName: string) => `# ${repoName}

This is a mock README for demonstration purposes.

## Features

- High performance API gateway
- Built-in rate limiting
- Authentication middleware
- Full observability

## Getting started

\`\`\`bash
npm install
npm run dev
\`\`\`

## License

MIT
`

export default function RepositoryPage({ params }: RepoPageProps) {
  const { name } = use(params)
  const [currentPath, setCurrentPath] = useState('')

  // Get contents of the current directory
  const currentFiles = getFilesAtPath(fileTree, currentPath)

  const handleNavigate = (newPath: string) => {
    setCurrentPath(newPath)
  }

  const handleGoUp = () => {
    if (!currentPath) return
    const parts = currentPath.split('/')
    parts.pop()
    setCurrentPath(parts.join('/'))
  }

  const breadcrumbs = currentPath ? currentPath.split('/') : []

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Main Content - File Browser + README */}
      <div className="lg:col-span-8 space-y-6">
        {/* Branch selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-white/10 dark:bg-zinc-900">
            <GitBranch className="size-4 text-zinc-500" />
            <span className="font-medium text-zinc-950 dark:text-white">main</span>
          </div>
          <Button plain size="sm">Switch branch</Button>
        </div>

        {/* File Browser with Navigation */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900">
          {/* Breadcrumbs + Actions */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-white/10">
            <div className="flex items-center gap-1 font-mono text-sm">
              <Link 
                href={`/repositories/${name}`} 
                onClick={() => setCurrentPath('')}
                className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                {name}
              </Link>
              <span className="text-zinc-400 dark:text-zinc-600">/</span>
              <span className="text-zinc-950 dark:text-white">main</span>
              {breadcrumbs.map((part, index) => {
                const pathUpToHere = breadcrumbs.slice(0, index + 1).join('/')
                return (
                  <span key={index} className="flex items-center">
                    <span className="text-zinc-400 dark:text-zinc-600">/</span>
                    <button
                      onClick={() => setCurrentPath(pathUpToHere)}
                      className="text-zinc-950 hover:underline dark:text-white"
                    >
                      {part}
                    </button>
                  </span>
                )
              })}
            </div>
            <Button plain size="sm">Add file</Button>
          </div>

          {/* File List */}
          <div className="divide-y divide-zinc-200 dark:divide-white/10 text-sm">
            {/* Go up one level */}
            {currentPath && (
              <div 
                onClick={handleGoUp}
                className="flex cursor-pointer items-center gap-3 px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400"
              >
                <span className="font-mono">..</span>
                <span className="text-xs">Go to parent directory</span>
              </div>
            )}

            {currentFiles.length === 0 && (
              <div className="px-4 py-6 text-center text-zinc-500 dark:text-zinc-400">
                This folder is empty.
              </div>
            )}

            {currentFiles.map((node, index) => {
              const fullPath = currentPath ? `${currentPath}/${node.name}` : node.name
              const isFolder = node.type === 'folder'

              return (
                <div 
                  key={index}
                  onClick={() => isFolder && handleNavigate(fullPath)}
                  className={`flex items-center gap-3 px-4 py-2.5 ${isFolder ? 'cursor-pointer hover:bg-zinc-50 dark:hover:bg-white/5' : 'hover:bg-zinc-50 dark:hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {isFolder ? (
                      <Folder className="size-5 text-amber-500 shrink-0" />
                    ) : (
                      <FileText className="size-5 text-zinc-400 shrink-0" />
                    )}
                    {isFolder ? (
                      <span className="font-medium text-zinc-950 dark:text-white truncate">
                        {node.name}
                      </span>
                    ) : (
                      <Link 
                        href={`/repositories/${name}/blob/main/${fullPath}`}
                        className="font-medium text-zinc-950 hover:underline dark:text-white truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {node.name}
                      </Link>
                    )}
                  </div>

                  <div className="hidden md:block text-xs text-zinc-500 dark:text-zinc-400 w-64 truncate">
                    {node.lastCommit}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 w-20 text-right">
                    {node.updated}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* README Preview - Proper Markdown Rendering */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <Heading level={3}>README.md</Heading>
            <Button plain size="sm">Edit</Button>
          </div>
          <MarkdownRenderer>
            {mockReadme(name)}
          </MarkdownRenderer>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <Heading level={4} className="mb-3">About</Heading>
          <Text className="text-sm">
            This is a high-performance API gateway built for the gitpo.st platform.
          </Text>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Language</span>
              <span className="font-medium text-zinc-950 dark:text-white">TypeScript</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Size</span>
              <span className="font-medium text-zinc-950 dark:text-white">2.4 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Last updated</span>
              <span className="font-medium text-zinc-950 dark:text-white">2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <Heading level={4} className="mb-3">Recent commits</Heading>
          <div className="space-y-3 text-sm">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-l-2 border-zinc-200 pl-3 dark:border-white/10">
                <div className="font-medium text-zinc-950 dark:text-white">Fix rate limiting edge case</div>
                <div className="text-zinc-500 dark:text-zinc-400">by daniel • 2h ago</div>
              </div>
            ))}
            <Link href={`/repositories/${name}/commits`} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
              View all commits →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper: Get files at a specific path from the tree
function getFilesAtPath(tree: FileNode[], path: string): FileNode[] {
  if (!path) return tree

  const parts = path.split('/')
  let current = tree

  for (const part of parts) {
    const found = current.find(node => node.name === part && node.type === 'folder')
    if (!found || !found.children) return []
    current = found.children
  }

  return current
}
