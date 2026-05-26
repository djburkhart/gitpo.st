import { Heading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'

export default function PipelinesPage() {
  return (
    <div>
      <Heading>Pipelines</Heading>
      <Text className="mt-2">GoCD pipelines connected to your repositories will appear here.</Text>

      <div className="mt-8 rounded-2xl border border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800">
        <p className="text-zinc-500 dark:text-zinc-400">
          Pipeline list coming soon. This will show real-time status from GoCD.
        </p>
      </div>
    </div>
  )
}
