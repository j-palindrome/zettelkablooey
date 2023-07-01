import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt('Is there order in the world?')
}

export default function WithoutOrder() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>For there to be a spark</Line>
      <Line>mainly without us, the original</Line>
      <Line>classic idea: a commenced measurement</Line>
      <Line>of the—</Line>
      <Line>somewhat offset by the theoretical considerations of</Line>
      <Line>and if they could be reordered—a minimum standard of</Line>
      <Line>daily renewal</Line>
    </GptMesh>
  )
}
