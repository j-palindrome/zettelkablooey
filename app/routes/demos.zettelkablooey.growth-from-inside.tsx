import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt('Do you have to throw up?')
}

export default function GrowthFromInside() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>my organs coalesced</Line>
      <Line>or thinness will reconcile</Line>
      <Line>this oroficial report, excised</Line>
      <Line>thetic wish: more than a stern audience, closer wave</Line>
      <Line>with his not-ever, the consequence of</Line>
      <Line>every silence imploded outwards toward</Line>
      <Line>the sequence asks, if you</Line>
    </GptMesh>
  )
}
