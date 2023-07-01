import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/components/GptMesh'
import MyLink from '~/components/MyLink'
import Line from '~/components/Line'
import { generatePrompt } from '~/services/gpt.server'

export async function loader() {
  return await generatePrompt('Why is the Zettelkasten useful?')
}

export default function Zettelkasten() {
  const gptText = useLoaderData<typeof loader>()

  return (
    <GptMesh gptText={gptText}>
      <Line>There is nothing between</Line>
      <Line>What would you see if</Line>
      <Line>the morningstar of this everlasting</Line>
      <Line>remains</Line>
      <Line>about itself? about golden?</Line>
      <Line>the index, nonwithstanding</Line>
    </GptMesh>
  )
}
