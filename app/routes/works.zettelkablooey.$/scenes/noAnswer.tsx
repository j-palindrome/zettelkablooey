import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/routes/works.zettelkablooey.$/components/GptMesh'
import Kablooey from '~/routes/works.zettelkablooey.$/components/Kablooey'
import Line from '~/routes/works.zettelkablooey.$/components/Line'
import { generatePrompt } from '~/routes/works.zettelkablooey.$/services/gpt.server'

export default function NoAnswer({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey {...{ gptText, showEffect, index }} title={`no-answer${index}`}>{`
      our offness, one organ fights another
      the structural coupling of gravity
      an essential determinant: sleepily taxonomized
      foregone from essential fear insipid of ears begone
      a corona of temporary reaction
      and the slippery rot of make
      believing that the olden days were
      and progressing towards the completion
    `}</Kablooey>
  )
}
