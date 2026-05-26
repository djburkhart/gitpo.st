'use client'

import { use } from 'react'
import { Heading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import { Button } from '@/components/catalyst/button'
import { Input } from '@/components/catalyst/input'
import { Field, FieldGroup, Label } from '@/components/catalyst/fieldset'

interface SettingsPageProps {
  params: Promise<{ name: string }>
}

export default function RepoSettingsPage({ params }: SettingsPageProps) {
  const { name } = use(params)

  return (
    <div className="max-w-2xl">
      <Heading>Repository Settings</Heading>
      <Text className="mt-2">Manage settings for <span className="font-mono">{name}</span>.</Text>

      <div className="mt-10">
        <form className="space-y-8">
          <FieldGroup>
            <Field>
              <Label>Repository name</Label>
              <Input name="name" defaultValue={name} />
            </Field>
            <Field>
              <Label>Description</Label>
              <Input name="description" defaultValue="Main API gateway service" />
            </Field>
          </FieldGroup>

          <div className="pt-4">
            <Button type="submit" color="dark">Save changes</Button>
          </div>
        </form>
      </div>

      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/10">
        <Heading level={3} className="text-red-600 dark:text-red-400">Danger Zone</Heading>
        <div className="mt-4 rounded-lg border border-red-200 p-4 dark:border-red-900/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-red-600 dark:text-red-400">Delete this repository</div>
              <Text className="mt-1 text-sm">Once you delete a repository, there is no going back.</Text>
            </div>
            <Button color="red" plain>Delete repository</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
