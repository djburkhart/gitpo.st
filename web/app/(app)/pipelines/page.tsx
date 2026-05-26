'use client'

import { Heading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import { Button } from '@/components/catalyst/button'
import { Badge } from '@/components/catalyst/badge'
import Link from 'next/link'
import { Play, Edit2 } from 'lucide-react'

const pipelines = [
  {
    name: 'api-gateway',
    description: 'Build, test and deploy the API gateway',
    lastRun: '2 hours ago',
    status: 'success',
    stages: 4,
  },
  {
    name: 'web-app',
    description: 'Frontend deployment pipeline',
    lastRun: 'yesterday',
    status: 'success',
    stages: 3,
  },
  {
    name: 'worker-service',
    description: 'Background processing service',
    lastRun: '3 days ago',
    status: 'failed',
    stages: 5,
  },
]

export default function PipelinesPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <Heading>Pipelines</Heading>
          <Text className="mt-1">Manage and edit your GoCD pipeline configurations</Text>
        </div>
        <Button color="dark">+ New Pipeline</Button>
      </div>

      <div className="mt-8 grid gap-4">
        {pipelines.map((pipeline) => (
          <div
            key={pipeline.name}
            className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-900"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="font-semibold text-lg tracking-tight">{pipeline.name}</div>
                <Badge color={pipeline.status === 'success' ? 'green' : 'red'}>
                  {pipeline.status}
                </Badge>
              </div>
              <Text className="mt-1 text-sm">{pipeline.description}</Text>
              <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                {pipeline.stages} stages • Last run {pipeline.lastRun}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href={`/pipelines/${pipeline.name}/editor`}>
                <Button plain size="sm">
                  <Edit2 className="size-4" />
                  Edit
                </Button>
              </Link>
              <Button plain size="sm">
                <Play className="size-4" />
                Run
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
