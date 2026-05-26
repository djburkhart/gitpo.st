'use client'

import { use } from 'react'
import { Heading } from '@/components/catalyst/heading'
import { Button } from '@/components/catalyst/button'
import Link from 'next/link'

interface BlobPageProps {
  params: Promise<{ name: string; path: string[] }>
}

const mockFileContent = `import express from 'express'
import { rateLimit } from './middleware/rateLimit'
import { auth } from './middleware/auth'

const app = express()

app.use(auth)
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }))

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

export default app
`

export default function FileViewer({ params }: BlobPageProps) {
  const { name, path } = use(params)
  const filePath = path.join('/')
  const fileName = path[path.length - 1]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href={`/repositories/${name}`} className="hover:text-zinc-950 dark:hover:text-white">main</Link>
          <span>/</span>
          <span className="font-mono text-zinc-950 dark:text-white">{filePath}</span>
        </div>
        <div className="flex gap-2">
          <Button plain size="sm">Raw</Button>
          <Button plain size="sm">Blame</Button>
          <Button plain size="sm">History</Button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-white/10">
          <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400">{fileName}</div>
          <div className="text-xs text-zinc-500">42 lines • 1.2 KB</div>
        </div>
        <pre className="overflow-auto p-4 text-sm font-mono text-zinc-800 dark:text-zinc-200">
          {mockFileContent}
        </pre>
      </div>
    </div>
  )
}
