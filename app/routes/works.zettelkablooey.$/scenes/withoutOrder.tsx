import { useLoaderData } from '@remix-run/react'
import GptMesh from '~/routes/works.zettelkablooey.$/components/GptMesh'
import Kablooey from '~/routes/works.zettelkablooey.$/components/Kablooey'
import Line from '~/routes/works.zettelkablooey.$/components/Line'
import { generatePrompt } from '~/routes/works.zettelkablooey.$/services/gpt.server'

export default function WithoutOrder({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey
      {...{ gptText, showEffect, index }}
      title={`without-order${index}`}
    >{`
      For there to be a spark
      mainly without us, the original
      classic idea: a commenced measurement
      of the—
      somewhat offset by the theoretical considerations of
      and if they could be reordered—a minimum standard of
      daily renewal
    `}</Kablooey>
  )
}
