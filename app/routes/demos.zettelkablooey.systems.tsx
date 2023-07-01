import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt("Explain Luhmann's systems theory.")
}

export default function Systems() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>a system</Line>
      <Line>of interlinked offset</Line>
      <Line>grapheme-control</Line>
      <Line>with every source collided</Line>
      <Line>: the "gravitation"—a simple determinant</Line>
      <Line>complexified by redoings, reorderings</Line>
      <Line>—if you're not before yourself</Line>
    </GptMesh>
  )
}
