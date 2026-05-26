'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownRendererProps {
  children: string
  className?: string
}

export function MarkdownRenderer({ children, className = '' }: MarkdownRendererProps) {
  // Simple dark mode detection
  const isDark = typeof window !== 'undefined' 
    ? document.documentElement.classList.contains('dark')
    : false

  const codeTheme = isDark ? vscDarkPlus : vs

  return (
    <div className={`prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-2 prose-p:my-3 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium hover:prose-a:underline prose-strong:font-semibold prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-[13px] prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-zinc-50 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-200 dark:prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:p-0 prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 dark:prose-blockquote:border-white/20 prose-blockquote:pl-4 prose-blockquote:italic prose-table:border prose-table:border-zinc-200 dark:prose-table:border-white/10 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : 'text'

            if (!inline && match) {
              return (
                <div className="my-4 overflow-hidden rounded-lg border border-zinc-200 dark:border-white/10">
                  <SyntaxHighlighter
                    language={language}
                    style={codeTheme}
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      fontSize: '13px',
                    }}
                    showLineNumbers
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              )
            }

            // Inline code
            return (
              <code 
                className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-[13px] text-zinc-800 dark:text-zinc-200" 
                {...props}
              >
                {children}
              </code>
            )
          },
          a({ node, ...props }) {
            return (
              <a 
                {...props} 
                className="text-blue-600 dark:text-blue-400 hover:underline" 
                target="_blank" 
                rel="noopener noreferrer" 
              />
            )
          },
          h1({ node, ...props }) {
            return <h1 className="text-2xl font-semibold tracking-tight mt-8 mb-4" {...props} />
          },
          h2({ node, ...props }) {
            return <h2 className="text-xl font-semibold tracking-tight mt-6 mb-3" {...props} />
          },
          h3({ node, ...props }) {
            return <h3 className="text-lg font-semibold tracking-tight mt-5 mb-2" {...props} />
          },
          ul({ node, ...props }) {
            return <ul className="list-disc pl-6 space-y-1 my-3" {...props} />
          },
          ol({ node, ...props }) {
            return <ol className="list-decimal pl-6 space-y-1 my-3" {...props} />
          },
          blockquote({ node, ...props }) {
            return (
              <blockquote 
                className="border-l-4 border-zinc-300 dark:border-white/20 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4" 
                {...props} 
              />
            )
          },
          table({ node, ...props }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-zinc-200 dark:border-white/10" {...props} />
              </div>
            )
          },
          th({ node, ...props }) {
            return <th className="border border-zinc-200 dark:border-white/10 px-3 py-2 bg-zinc-50 dark:bg-white/5 text-left font-semibold" {...props} />
          },
          td({ node, ...props }) {
            return <td className="border border-zinc-200 dark:border-white/10 px-3 py-2" {...props} />
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
