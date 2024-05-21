import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/routes/works.zettelkablooey.$/components/GptMesh'
import Kablooey from '~/routes/works.zettelkablooey.$/components/Kablooey'
import Line from '~/routes/works.zettelkablooey.$/components/Line'
import { generatePrompt } from '~/routes/works.zettelkablooey.$/services/gpt.server'

export default function Linking({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey {...{ gptText, showEffect, index }} title={`linking${index}`}>{`
      the world thwarted between our own offerings
      a system of control, of barbaric mutiny towards
      or claustrophobic, catacombed, convalescent
      my mother explains the doorway:
      and visited sound, reneging on the original
      favorably?
    `}</Kablooey>
  )
}
