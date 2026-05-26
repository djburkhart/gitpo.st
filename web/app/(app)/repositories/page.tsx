'use client'

import { useState } from 'react'
import { Heading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import { Button } from '@/components/catalyst/button'
import { Badge } from '@/components/catalyst/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'
import Link from 'next/link'
import { NewRepositoryModal } from '@/components/new-repository-modal'

interface Repo {
  name: string
  description?: string
  visibility: 'Private' | 'Public'
  lastPush: string
  pipelines: number
}

export default function RepositoriesPage() {
  const [repos, setRepos] = useState<Repo[]>([
    { name: 'api-gateway', description: 'Main API gateway service', visibility: 'Private', lastPush: '2h ago', pipelines: 4 },
    { name: 'web-app', description: 'Frontend application', visibility: 'Private', lastPush: 'yesterday', pipelines: 7 },
    { name: 'worker-service', description: 'Background job processor', visibility: 'Private', lastPush: '3d ago', pipelines: 3 },
    { name: 'docs', description: 'Documentation site', visibility: 'Public', lastPush: '1w ago', pipelines: 1 },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRepositoryCreated = (newRepo: { name: string; description?: string; visibility: 'Private' | 'Public' }) => {
    const repoToAdd: Repo = {
      ...newRepo,
      lastPush: 'just now',
      pipelines: 0,
    }
    setRepos(prev => [repoToAdd, ...prev])
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Heading>Repositories</Heading>
          <Text className="mt-1">All Git repositories connected to gitpo.st</Text>
        </div>
        <Button color="dark" onClick={() => setIsModalOpen(true)}>
          New repository
        </Button>
      </div>

      <NewRepositoryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRepositoryCreated={handleRepositoryCreated}
      />

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
          {repos.map((repo, i) => (
            <TableRow key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <TableCell>
                <Link 
                  href={`/repositories/${repo.name}`} 
                  className="font-semibold text-zinc-950 hover:underline dark:text-white"
                >
                  {repo.name}
                </Link>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{repo.description}</div>
              </TableCell>
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
