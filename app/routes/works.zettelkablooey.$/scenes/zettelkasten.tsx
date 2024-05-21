import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/routes/works.zettelkablooey.$/components/GptMesh'
import Kablooey from '~/routes/works.zettelkablooey.$/components/Kablooey'
import MyLink from '~/routes/works.zettelkablooey.$/components/MyLink'
import Line from '~/routes/works.zettelkablooey.$/components/Line'
import { generatePrompt } from '~/routes/works.zettelkablooey.$/services/gpt.server'

export default function Zettelkasten({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey
      {...{ gptText, showEffect, index }}
      title={`zettelkasten${index}`}
    >{`
      There is nothing between
      What would you see if
      the morningstar of this everlasting
      remains
      about itself? about golden?
      the index, nonwithstanding
    `}</Kablooey>
  )
}
