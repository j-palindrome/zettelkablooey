import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt('What describes a connection?')
}

export default function Linking() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>the world thwarted between our own offerings</Line>
      <Line>a system of control, of barbaric mutiny towards</Line>
      <Line>or claustrophobic, catacombed, convalescent</Line>
      <Line>my mother explains the doorway:</Line>
      <Line>and visited sound, reneging on the original</Line>
      <Line>favorably?</Line>
    </GptMesh>
  )
}
