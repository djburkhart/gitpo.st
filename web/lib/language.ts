// Shared language normalizer for consistent syntax highlighting across the app
export function normalizeLanguage(langOrExt: string): string {
  const lower = langOrExt.toLowerCase().trim().replace(/^\./, '')

  const map: Record<string, string> = {
    js: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'tsx',
    py: 'python',
    rb: 'ruby',
    rs: 'rust',
    go: 'go',
    java: 'java',
    kt: 'kotlin',
    cs: 'csharp',
    cpp: 'cpp',
    c: 'c',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
    yml: 'yaml',
    yaml: 'yaml',
    json: 'json',
    md: 'markdown',
    mdx: 'mdx',
    dockerfile: 'docker',
    sql: 'sql',
    graphql: 'graphql',
    html: 'html',
    css: 'css',
    scss: 'scss',
    xml: 'xml',
  }

  return map[lower] || lower || 'text'
}
