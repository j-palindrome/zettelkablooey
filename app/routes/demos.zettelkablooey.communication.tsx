import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt('What is the truest way to communicate?')
}

export default function Communication() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>if one were to</Line>
      <Line>and this other is before one</Line>
      <Line>saying push me out of synechdoche with</Line>
      <Line>but we were all deceived: the morning after</Line>
      <Line>with open lines of lightning</Line>
      <Line>stabbed beyond recognition</Line>
      <Line>if ostracized</Line>
      <Line>give up your ghosts, </Line>
    </GptMesh>
  )
}
