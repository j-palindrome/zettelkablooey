import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt('Is the world inherently good or evil?')
}

export default function NoAnswer() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>our offness, one organ fights another</Line>
      <Line>the structural coupling of gravity</Line>
      <Line>an essential determinant: sleepily taxonomized</Line>
      <Line>foregone from essential fear insipid of ears begone</Line>
      <Line>a corona of temporary reaction</Line>
      <Line>and the slippery rot of make</Line>
      <Line>believing that the olden days were</Line>
      <Line>and progressing towards the completion</Line>
    </GptMesh>
  )
}
