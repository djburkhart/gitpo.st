import { Heading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import { Button } from '@/components/catalyst/button'
import { Input } from '@/components/catalyst/input'
import { Field, FieldGroup, Label } from '@/components/catalyst/fieldset'

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <Heading>Settings</Heading>
      <Text className="mt-2">Manage your gitpo.st account and preferences.</Text>

      <div className="mt-10">
        <form className="space-y-8">
          <FieldGroup>
            <Field>
              <Label>Organization name</Label>
              <Input name="org" defaultValue="Resolvora" />
            </Field>
            <Field>
              <Label>Default region</Label>
              <Input name="region" defaultValue="us-central1" />
            </Field>
          </FieldGroup>

          <Button type="submit" color="dark">Save changes</Button>
        </form>
      </div>
    </div>
  )
}
