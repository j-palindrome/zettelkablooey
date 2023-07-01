import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt('Describe the ideal order.')
}

export default function Ordering() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>one first then another</Line>
      <Line>and so Adam named the animals: </Line>
      <Line>—but if the starry-eyed have purpose to</Line>
      <Line>remarking upon their "one-another," a hierarchy emerges</Line>
      <Line>climbing towards the sky, a Babel</Line>
      <Line>when we learn instigation of force</Line>
      <Line>but what offset is there?</Line>
    </GptMesh>
  )
}
