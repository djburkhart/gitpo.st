'use client'

import { use } from 'react'
import { Heading } from '@/components/catalyst/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'
import { Avatar } from '@/components/catalyst/avatar'

interface CommitsPageProps {
  params: Promise<{ name: string }>
}

const mockCommits = [
  { sha: 'a1b2c3d', message: 'Fix rate limiting edge case in middleware', author: 'Daniel Burkhart', date: '2 hours ago' },
  { sha: 'e4f5g6h', message: 'Add request logging and tracing', author: 'Sarah Chen', date: 'yesterday' },
  { sha: 'i7j8k9l', message: 'Upgrade dependencies and fix type errors', author: 'Daniel Burkhart', date: '3 days ago' },
  { sha: 'm0n1o2p', message: 'Initial project setup with CI pipeline', author: 'Sarah Chen', date: '2 weeks ago' },
]

export default function CommitsPage({ params }: CommitsPageProps) {
  const { name } = use(params)

  return (
    <div>
      <div className="mb-6">
        <Heading>Commits</Heading>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">History for {name} on main</p>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Commit</TableHeader>
            <TableHeader>Author</TableHeader>
            <TableHeader>Date</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockCommits.map((commit) => (
            <TableRow key={commit.sha}>
              <TableCell>
                <div className="font-mono text-xs text-blue-600 dark:text-blue-400">{commit.sha}</div>
                <div className="font-medium text-zinc-950 dark:text-white mt-1">{commit.message}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar initials={commit.author.split(' ').map(n => n[0]).join('')} className="size-6" />
                  <span>{commit.author}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">{commit.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
