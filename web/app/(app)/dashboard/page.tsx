import { Heading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import { Button } from '@/components/catalyst/button'
import { Badge } from '@/components/catalyst/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'
import { GitBranch, PlayCircle, Clock } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between">
        <div>
          <Heading>Good morning, Daniel</Heading>
          <Text className="mt-2">Here's what's happening with your projects today.</Text>
        </div>
        <Button color="dark">New Repository</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
          <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <GitBranch className="size-4" /> Repositories
          </div>
          <div className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">47</div>
          <div className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">+3 this week</div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
          <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <PlayCircle className="size-4" /> Pipelines
          </div>
          <div className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">312</div>
          <div className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">89% success rate</div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
          <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <Clock className="size-4" /> Avg. Build Time
          </div>
          <div className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">2m 41s</div>
          <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">-14s from last week</div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
          <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Active Users
          </div>
          <div className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">18</div>
          <div className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">4 currently online</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <Heading level={2}>Recent Activity</Heading>
          <Button plain>View all</Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Repository</TableHeader>
              <TableHeader>Pipeline</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Duration</TableHeader>
              <TableHeader>Triggered</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { repo: 'api-gateway', pipeline: 'deploy-prod', status: 'success', duration: '3m 12s', time: '2 minutes ago' },
              { repo: 'web-app', pipeline: 'build-and-test', status: 'success', duration: '1m 48s', time: '14 minutes ago' },
              { repo: 'worker-service', pipeline: 'deploy-staging', status: 'failed', duration: '47s', time: '41 minutes ago' },
              { repo: 'docs', pipeline: 'deploy', status: 'success', duration: '22s', time: '2 hours ago' },
            ].map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{item.repo}</TableCell>
                <TableCell className="text-zinc-500 dark:text-zinc-400">{item.pipeline}</TableCell>
                <TableCell>
                  <Badge color={item.status === 'success' ? 'green' : 'red'}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-zinc-500 dark:text-zinc-400">{item.duration}</TableCell>
                <TableCell className="text-zinc-500 dark:text-zinc-400">{item.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
