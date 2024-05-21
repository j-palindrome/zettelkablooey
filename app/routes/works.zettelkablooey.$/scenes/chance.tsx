import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/routes/works.zettelkablooey.$/components/GptMesh'
import Kablooey from '~/routes/works.zettelkablooey.$/components/Kablooey'
import Line from '~/routes/works.zettelkablooey.$/components/Line'
import { generatePrompt } from '~/routes/works.zettelkablooey.$/services/gpt.server'

export default function Chance({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey {...{ gptText, showEffect, index }} title={`chance${index}`}>{`
      if this were to become oneself, a simple arrangement
      gone outward, spit off the dock towards
      and nobody would ask first, without warning
      a light, a boring soul caresses your slighted
      grammar within, collected as if repenting
      a secret inward
    `}</Kablooey>
  )
}
