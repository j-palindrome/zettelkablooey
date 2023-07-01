import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt('Give me assurance for the future.')
}

export default function Assured() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>the error of our ways</Line>
      <Line>in thinking there is</Line>
      <Line>flourishing without bound, without boundaries</Line>
      <Line>upon—is this not assurance? or the open wound</Line>
      <Line>without which one? a log lies</Line>
      <Line>—your mind, behind me</Line>
    </GptMesh>
  )
}
