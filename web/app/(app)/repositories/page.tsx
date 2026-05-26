import { Heading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import { Button } from '@/components/catalyst/button'
import { Badge } from '@/components/catalyst/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'

export default function RepositoriesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Heading>Repositories</Heading>
          <Text className="mt-1">All Git repositories connected to gitpo.st</Text>
        </div>
        <Button color="dark">New repository</Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Visibility</TableHeader>
            <TableHeader>Last push</TableHeader>
            <TableHeader>Pipelines</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            { name: 'api-gateway', visibility: 'Private', lastPush: '2h ago', pipelines: 4 },
            { name: 'web-app', visibility: 'Private', lastPush: 'yesterday', pipelines: 7 },
            { name: 'worker-service', visibility: 'Private', lastPush: '3d ago', pipelines: 3 },
            { name: 'docs', visibility: 'Public', lastPush: '1w ago', pipelines: 1 },
          ].map((repo, i) => (
            <TableRow key={i}>
              <TableCell className="font-semibold text-zinc-950 dark:text-white">{repo.name}</TableCell>
              <TableCell>
                <Badge color={repo.visibility === 'Private' ? 'zinc' : 'blue'}>{repo.visibility}</Badge>
              </TableCell>
              <TableCell className="text-zinc-500 dark:text-zinc-400">{repo.lastPush}</TableCell>
              <TableCell>{repo.pipelines} active</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
