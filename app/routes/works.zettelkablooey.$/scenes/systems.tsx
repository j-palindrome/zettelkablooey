import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/routes/works.zettelkablooey.$/components/GptMesh'
import Kablooey from '~/routes/works.zettelkablooey.$/components/Kablooey'
import Line from '~/routes/works.zettelkablooey.$/components/Line'
import { generatePrompt } from '~/routes/works.zettelkablooey.$/services/gpt.server'

export default function Systems({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey {...{ gptText, showEffect, index }} title={`systems${index}`}>{`
      a system
      of interlinked offset
      grapheme-control
      with every source collided
      : the "gravitation"—a simple determinant
      complexified by redoings, reorderings
      —if you're not before yourself
    `}</Kablooey>
  )
}
