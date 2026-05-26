'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from '@/components/catalyst/dialog'
import { Button } from '@/components/catalyst/button'
import { Input } from '@/components/catalyst/input'
import { Textarea } from '@/components/catalyst/textarea'
import { Field, FieldGroup, Label, Description } from '@/components/catalyst/fieldset'
import { Radio, RadioGroup, RadioField } from '@/components/catalyst/radio'
import { Checkbox, CheckboxField } from '@/components/catalyst/checkbox'
import { useRouter } from 'next/navigation'

interface NewRepositoryModalProps {
  open: boolean
  onClose: () => void
  onRepositoryCreated?: (repo: { name: string; description?: string; visibility: 'Private' | 'Public' }) => void
}

export function NewRepositoryModal({ open, onClose, onRepositoryCreated }: NewRepositoryModalProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState<'Private' | 'Public'>('Private')
  const [initializeWithReadme, setInitializeWithReadme] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600))

    const newRepo = {
      name: name.trim(),
      description: description.trim() || undefined,
      visibility,
    }

    // Notify parent
    onRepositoryCreated?.(newRepo)

    // Reset form
    setName('')
    setDescription('')
    setVisibility('Private')
    setInitializeWithReadme(true)
    setIsSubmitting(false)
    onClose()

    // Navigate to the new repository
    router.push(`/repositories/${encodeURIComponent(newRepo.name)}`)
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a new repository</DialogTitle>
      <DialogDescription>
        A repository contains all your project's files and revision history.
      </DialogDescription>

      <form onSubmit={handleSubmit}>
        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Repository name</Label>
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="my-awesome-project"
                required
                autoFocus
              />
              <Description>
                Great repository names are short and memorable.
              </Description>
            </Field>

            <Field>
              <Label>Description (optional)</Label>
              <Textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </Field>

            <Field>
              <Label>Visibility</Label>
              <RadioGroup value={visibility} onChange={(value) => setVisibility(value as 'Private' | 'Public')}>
                <RadioField>
                  <Radio value="Private" />
                  <Label>Private</Label>
                  <Description>Only you and collaborators can see this repository.</Description>
                </RadioField>
                <RadioField>
                  <Radio value="Public" />
                  <Label>Public</Label>
                  <Description>Anyone on the internet can see this repository.</Description>
                </RadioField>
              </RadioGroup>
            </Field>

            <Field>
              <CheckboxField>
                <Checkbox
                  checked={initializeWithReadme}
                  onChange={(checked) => setInitializeWithReadme(checked)}
                />
                <Label>Initialize this repository with a README</Label>
              </CheckboxField>
            </Field>
          </FieldGroup>
        </DialogBody>

        <DialogActions>
          <Button plain onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" color="dark" disabled={!name.trim() || isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create repository'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
