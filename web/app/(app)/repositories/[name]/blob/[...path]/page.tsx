'use client'

import { use } from 'react'
import { Button } from '@/components/catalyst/button'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlobPageProps {
  params: Promise<{ name: string; path: string[] }>
}

// Mock content per file type
const getMockContent = (fileName: string) => {
  if (fileName.endsWith('.md') || fileName === 'README.md') {
    return `# ${fileName}\n\nThis is a sample markdown file with **bold** and *italic* text.\n\n## Features\n\n- Feature one\n- Feature two\n\n\`\`\`ts\nconsole.log("Hello from code block")\n\`\`\``
  }
  return `import express from 'express'
import { rateLimit } from './middleware/rateLimit'
import { auth } from './middleware/auth'

const app = express()

app.use(auth)
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }))

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

export default app`
}

function getLanguage(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  const map: Record<string, string> = {
    ts: 'typescript',
    tsx: 'tsx',
    js: 'javascript',
    jsx: 'jsx',
    json: 'json',
    md: 'markdown',
    yml: 'yaml',
    yaml: 'yaml',
    css: 'css',
    html: 'html',
    sh: 'bash',
  }
  return map[ext] || 'text'
}

export default function FileViewer({ params }: BlobPageProps) {
  const { name, path } = use(params)
  const filePath = path.join('/')
  const fileName = path[path.length - 1]
  const content = getMockContent(fileName)
  const language = getLanguage(fileName)
  const isMarkdown = fileName.endsWith('.md') || fileName === 'README.md'

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

      <div className="rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900 overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950">
          <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400">{fileName}</div>
          <div className="text-xs text-zinc-500">42 lines • 1.2 KB • {language}</div>
        </div>

        <div className="overflow-auto text-sm">
          {isMarkdown ? (
            <div className="prose prose-sm dark:prose-invert max-w-none p-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <SyntaxHighlighter
              language={language}
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: 'transparent',
                fontSize: '13px',
              }}
              showLineNumbers
            >
              {content}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </div>
  )
}
