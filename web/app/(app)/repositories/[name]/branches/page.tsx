'use client'

import { use } from 'react'
import { Heading } from '@/components/catalyst/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'
import { Badge } from '@/components/catalyst/badge'

interface BranchesPageProps {
  params: Promise<{ name: string }>
}

const mockBranches = [
  { name: 'main', isDefault: true, lastCommit: 'a1b2c3d', updated: '2h ago', ahead: 0, behind: 0 },
  { name: 'feature/rate-limit-v2', isDefault: false, lastCommit: 'f9e8d7c', updated: '1d ago', ahead: 12, behind: 3 },
  { name: 'fix/auth-bug', isDefault: false, lastCommit: 'b4a5c6d', updated: '4d ago', ahead: 5, behind: 8 },
]

export default function BranchesPage({ params }: BranchesPageProps) {
  const { name } = use(params)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Heading>Branches</Heading>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">All branches in {name}</p>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Branch</TableHeader>
            <TableHeader>Last commit</TableHeader>
            <TableHeader>Updated</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockBranches.map((branch) => (
            <TableRow key={branch.name}>
              <TableCell>
                <div className="flex items-center gap-2 font-medium">
                  {branch.name}
                  {branch.isDefault && <Badge color="green">default</Badge>}
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{branch.lastCommit}</TableCell>
              <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">{branch.updated}</TableCell>
              <TableCell>
                {branch.ahead > 0 && <span className="text-emerald-600 dark:text-emerald-400 text-sm">+{branch.ahead}</span>}
                {branch.behind > 0 && <span className="ml-2 text-amber-600 dark:text-amber-400 text-sm">-{branch.behind}</span>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
