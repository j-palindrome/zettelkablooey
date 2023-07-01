import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt(
    'What is the best way to store tags in a database?'
  )
}

export default function Registry() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>A single world</Line>
      <Line>word connotes</Line>
      <Line>the unpacked expanse, a lively</Line>
      <Line>of sorts, a literary ecosystem</Line>
      <Line>the constant thicket of</Line>
      <Line>nonessence, quintessence, or a sequence? But</Line>
    </GptMesh>
  )
}
