'use client'

import { use } from 'react'
import { useState } from 'react'
import { Heading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import { Button } from '@/components/catalyst/button'
import { Badge } from '@/components/catalyst/badge'
import { 
  Dialog, 
  DialogTitle, 
  DialogDescription, 
  DialogBody, 
  DialogActions 
} from '@/components/catalyst/dialog'
import { Input } from '@/components/catalyst/input'
import { Textarea } from '@/components/catalyst/textarea'
import { Field, FieldGroup, Label } from '@/components/catalyst/fieldset'
import { 
  Plus, 
  Play, 
  Save, 
  GitBranch, 
  Settings, 
  Trash2 
} from 'lucide-react'

interface PipelineEditorProps {
  params: Promise<{ name: string }>
}

type Task = {
  id: string
  type: string
  command?: string
  description: string
}

type Job = {
  id: string
  name: string
  tasks: Task[]
}

type Stage = {
  id: string
  name: string
  jobs: Job[]
}

export default function PipelineEditorPage({ params }: PipelineEditorProps) {
  const { name } = use(params)

  const [stages, setStages] = useState<Stage[]>([
    {
      id: 's1',
      name: 'Build',
      jobs: [
        {
          id: 'j1',
          name: 'compile',
          tasks: [
            { id: 't1', type: 'Exec', command: 'npm ci', description: 'Install dependencies' },
            { id: 't2', type: 'Exec', command: 'npm run build', description: 'Build application' },
          ],
        },
      ],
    },
    {
      id: 's2',
      name: 'Test',
      jobs: [
        {
          id: 'j2',
          name: 'unit-tests',
          tasks: [{ id: 't3', type: 'Exec', command: 'npm test', description: 'Run unit tests' }],
        },
        {
          id: 'j3',
          name: 'lint',
          tasks: [{ id: 't4', type: 'Exec', command: 'npm run lint', description: 'Lint code' }],
        },
      ],
    },
    {
      id: 's3',
      name: 'Deploy to Staging',
      jobs: [
        {
          id: 'j4',
          name: 'deploy',
          tasks: [{ id: 't5', type: 'Exec', command: './deploy.sh staging', description: 'Deploy to staging' }],
        },
      ],
    },
  ])

  const [selectedJob, setSelectedJob] = useState<{ stageId: string; job: Job } | null>(null)
  const [isAddStageOpen, setIsAddStageOpen] = useState(false)
  const [newStageName, setNewStageName] = useState('')

  const addStage = () => {
    if (!newStageName.trim()) return

    const newStage: Stage = {
      id: `s${Date.now()}`,
      name: newStageName.trim(),
      jobs: [],
    }

    setStages([...stages, newStage])
    setNewStageName('')
    setIsAddStageOpen(false)
  }

  const addJobToStage = (stageId: string) => {
    const jobName = prompt('Job name:')
    if (!jobName) return

    setStages(stages.map(stage => {
      if (stage.id === stageId) {
        return {
          ...stage,
          jobs: [
            ...stage.jobs,
            {
              id: `j${Date.now()}`,
              name: jobName,
              tasks: [],
            },
          ],
        }
      }
      return stage
    }))
  }

  const addTaskToJob = (stageId: string, jobId: string) => {
    const taskType = prompt('Task type (Exec, Fetch, etc.):') || 'Exec'
    const command = prompt('Command / Script:')

    if (!command) return

    setStages(stages.map(stage => {
      if (stage.id === stageId) {
        return {
          ...stage,
          jobs: stage.jobs.map(job => {
            if (job.id === jobId) {
              return {
                ...job,
                tasks: [
                  ...job.tasks,
                  {
                    id: `t${Date.now()}`,
                    type: taskType,
                    command,
                    description: `${taskType} task`,
                  },
                ],
              }
            }
            return job
          }),
        }
      }
      return stage
    }))
  }

  const deleteStage = (stageId: string) => {
    if (!confirm('Delete this stage and all its jobs?')) return
    setStages(stages.filter(s => s.id !== stageId))
    if (selectedJob?.stageId === stageId) setSelectedJob(null)
  }

  const deleteJob = (stageId: string, jobId: string) => {
    setStages(stages.map(stage => {
      if (stage.id === stageId) {
        return {
          ...stage,
          jobs: stage.jobs.filter(j => j.id !== jobId),
        }
      }
      return stage
    }))
    if (selectedJob?.job.id === jobId) setSelectedJob(null)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-white/10">
        <div>
          <Heading>Pipeline Editor</Heading>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="font-mono">{name}</span>
            <Badge color="green">Active</Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button plain>
            <Play className="size-4" />
            Trigger Pipeline
          </Button>
          <Button color="dark">
            <Save className="size-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Materials Section */}
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">Materials</div>
            <Text className="text-sm">Git repositories that trigger this pipeline</Text>
          </div>
          <Button plain size="sm">+ Add Material</Button>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm dark:border-white/10 dark:bg-zinc-950">
            <GitBranch className="size-4 text-emerald-500" />
            <div>
              <div className="font-medium">api-gateway</div>
              <div className="text-xs text-zinc-500">main branch • gitpo.st</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Stage Editor */}
      <div className="mt-6 flex-1">
        <div className="mb-3 flex items-center justify-between">
          <div className="font-semibold text-lg">Stages</div>
          <Button onClick={() => setIsAddStageOpen(true)} color="dark" size="sm">
            <Plus className="size-4" /> Add Stage
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-8">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className="min-w-[280px] flex-shrink-0 rounded-2xl border border-zinc-200 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">
                    {index + 1}
                  </div>
                  <div className="font-semibold text-lg tracking-tight">{stage.name}</div>
                </div>
                <button
                  onClick={() => deleteStage(stage.id)}
                  className="text-zinc-400 hover:text-red-500"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Jobs */}
              <div className="space-y-3 p-4">
                {stage.jobs.length === 0 && (
                  <div className="rounded-lg border border-dashed border-zinc-200 p-4 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                    No jobs yet
                  </div>
                )}

                {stage.jobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob({ stageId: stage.id, job })}
                    className="cursor-pointer rounded-xl border border-zinc-200 bg-white p-3 transition hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-950 dark:hover:border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{job.name}</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteJob(stage.id, job.id)
                        }}
                        className="text-zinc-400 hover:text-red-500"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>

                    <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                      {job.tasks.length} task{job.tasks.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                ))}

                <Button
                  plain
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => addJobToStage(stage.id)}
                >
                  <Plus className="size-4" /> Add Job
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Job Details */}
      {selectedJob && (
        <div className="fixed bottom-0 right-0 top-0 w-96 border-l border-zinc-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-zinc-900 overflow-auto">
          <div className="flex items-center justify-between">
            <Heading level={3}>{selectedJob.job.name}</Heading>
            <Button plain size="sm" onClick={() => setSelectedJob(null)}>
              Close
            </Button>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm font-medium">
              <span>Tasks</span>
              <Button 
                size="sm" 
                plain
                onClick={() => addTaskToJob(selectedJob.stageId, selectedJob.job.id)}
              >
                + Add Task
              </Button>
            </div>

            <div className="space-y-2">
              {selectedJob.job.tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-xl border border-zinc-200 bg-white p-4 text-sm dark:border-white/10 dark:bg-zinc-950"
                >
                  <div className="flex items-center gap-2 font-medium">
                    <Badge color="zinc">{task.type}</Badge>
                    {task.description}
                  </div>
                  {task.command && (
                    <pre className="mt-2 rounded bg-zinc-100 p-2 font-mono text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {task.command}
                    </pre>
                  )}
                </div>
              ))}

              {selectedJob.job.tasks.length === 0 && (
                <div className="text-sm text-zinc-500">No tasks defined yet.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Stage Dialog */}
      <Dialog open={isAddStageOpen} onClose={() => setIsAddStageOpen(false)}>
        <DialogTitle>Add New Stage</DialogTitle>
        <DialogDescription>
          Stages run sequentially. Jobs inside a stage can run in parallel.
        </DialogDescription>

        <DialogBody>
          <Field>
            <Label>Stage Name</Label>
            <Input 
              value={newStageName} 
              onChange={(e) => setNewStageName(e.target.value)} 
              placeholder="e.g. Integration Tests"
            />
          </Field>
        </DialogBody>

        <DialogActions>
          <Button plain onClick={() => setIsAddStageOpen(false)}>Cancel</Button>
          <Button color="dark" onClick={addStage}>Create Stage</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
