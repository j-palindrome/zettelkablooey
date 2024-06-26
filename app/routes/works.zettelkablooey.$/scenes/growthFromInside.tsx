import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/routes/works.zettelkablooey.$/components/GptMesh'
import Kablooey from '~/routes/works.zettelkablooey.$/components/Kablooey'
import Line from '~/routes/works.zettelkablooey.$/components/Line'
import { generatePrompt } from '~/routes/works.zettelkablooey.$/services/gpt.server'

export default function GrowthFromInside({
  gptText,
  showEffect,
  index,
}: Props) {
  return (
    <Kablooey
      {...{ gptText, showEffect, index }}
      title={`growth-from-inside${index}`}
    >{`
      my organs coalesced
      or thinness will reconcile
      this oroficial report, excised
      thetic wish: more than a stern audience, closer wave
      with his not-ever, the consequence of
      every silence imploded outwards toward
      the sequence asks, if you
    `}</Kablooey>
  )
}
