'use client'

'use client'

import { use } from 'react'
import { Heading } from '@/components/catalyst/heading'
import { Badge } from '@/components/catalyst/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'
import Link from 'next/link'
import { Button } from '@/components/catalyst/button'
import { Edit2 } from 'lucide-react'

interface PipelinesPageProps {
  params: Promise<{ name: string }>
}

const mockPipelines = [
  { id: 'deploy-prod', status: 'success', duration: '3m 12s', triggered: '2h ago', branch: 'main' },
  { id: 'build-and-test', status: 'success', duration: '1m 48s', triggered: 'yesterday', branch: 'main' },
  { id: 'security-scan', status: 'failed', duration: '47s', triggered: '3d ago', branch: 'feature/rate-limit-v2' },
]

export default function RepoPipelinesPage({ params }: PipelinesPageProps) {
  const { name } = use(params)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Heading>Pipelines for {name}</Heading>
        <Link href={`/pipelines/${name}/editor`}>
          <Button plain size="sm">
            <Edit2 className="size-4" /> Edit Pipeline Configuration
          </Button>
        </Link>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Pipeline</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Duration</TableHeader>
            <TableHeader>Branch</TableHeader>
            <TableHeader>Triggered</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockPipelines.map((p, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{p.id}</TableCell>
              <TableCell>
                <Badge color={p.status === 'success' ? 'green' : 'red'}>{p.status}</Badge>
              </TableCell>
              <TableCell>{p.duration}</TableCell>
              <TableCell className="font-mono text-sm text-zinc-500 dark:text-zinc-400">{p.branch}</TableCell>
              <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">{p.triggered}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
