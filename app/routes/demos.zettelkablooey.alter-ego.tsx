import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt('Are you conscious?')
}

export default function Assured() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>the original doppelgänger</Line>
      <Line>before we warned you</Line>
      <Line>a mode of address, a pessimism</Line>
      <Line>broke the bond</Line>
      <Line>—it's out, parallelism, confounded</Line>
      <Line>released upon called-relation</Line>
      <Line>cofounding</Line>
    </GptMesh>
  )
}
