'use client'

import { use } from 'react'
import { Heading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import { Button } from '@/components/catalyst/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'
import { Badge } from '@/components/catalyst/badge'
import { Folder, FileText, GitBranch } from 'lucide-react'
import Link from 'next/link'

interface RepoPageProps {
  params: Promise<{ name: string }>
}

// Mock file tree
const mockFiles = [
  { name: '.github', type: 'folder', lastCommit: 'Update workflows', updated: '2h ago' },
  { name: 'src', type: 'folder', lastCommit: 'Refactor auth module', updated: 'yesterday' },
  { name: 'README.md', type: 'file', lastCommit: 'Update installation steps', updated: '3d ago' },
  { name: 'package.json', type: 'file', lastCommit: 'Bump dependencies', updated: '1w ago' },
  { name: 'tsconfig.json', type: 'file', lastCommit: 'Initial commit', updated: '2w ago' },
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

        {/* File Browser */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 px-4 py-3 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
                gitpo.st / {name} / <span className="text-zinc-950 dark:text-white">main</span>
              </div>
              <Button plain size="sm">Add file</Button>
            </div>
          </div>

          <Table>
            <TableBody>
              {mockFiles.map((file, index) => (
                <TableRow key={index} className="hover:bg-zinc-50 dark:hover:bg-white/5">
                  <TableCell className="flex items-center gap-3 py-3">
                    {file.type === 'folder' ? (
                      <Folder className="size-5 text-amber-500" />
                    ) : (
                      <FileText className="size-5 text-zinc-400" />
                    )}
                    <Link 
                      href={`/repositories/${name}/blob/main/${file.name}`} 
                      className="font-medium text-zinc-950 hover:underline dark:text-white"
                    >
                      {file.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">
                    {file.lastCommit}
                  </TableCell>
                  <TableCell className="text-right text-sm text-zinc-500 dark:text-zinc-400">
                    {file.updated}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* README Preview */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <Heading level={3}>README.md</Heading>
            <Button plain size="sm">Edit</Button>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300 font-mono bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg overflow-auto">
              {mockReadme(name)}
            </pre>
          </div>
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
