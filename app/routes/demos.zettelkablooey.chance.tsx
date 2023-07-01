import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt('What is up to chance?')
}

export default function Chance() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>if this were to become oneself, a simple arrangement</Line>
      <Line>gone outward, spit off the dock towards</Line>
      <Line>and nobody would ask first, without warning</Line>
      <Line>a light, a boring soul caresses your slighted</Line>
      <Line>grammar within, collected as if repenting</Line>
      <Line>a secret inward</Line>
    </GptMesh>
  )
}
