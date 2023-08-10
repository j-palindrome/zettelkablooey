import { animated, useSpring, useSprings } from '@react-spring/web'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import _ from 'lodash'
import math from 'mathjs'
import { Vector } from 'matter-js'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Kablooey from '~/components/Kablooey'
import { useFlicker, useFlickers } from '~/services/animation'
import { useDimensions, useMousePosition } from '~/services/dom.client'
import { generatePrompt } from '~/services/gpt.server'
import { lerp } from '~/services/math'
import { useFakeStream } from '~/services/text.client'

export default function Index() {
  return (
    <Suspense fallback={<></>}>
      <ClientIndex />
    </Suspense>
  )
}

const FONT_SIZE = 0.8

export const index: Line[] = [
  {
    t: 'zettelkasten',
    w: 'zettelkasten'.length * 48 * FONT_SIZE,
    s: { fontSize: 48 },
    o: 0.6,
    id: 'zettelkasten',
  },
  {
    t: 'kann hier nicht deduktiv, nicht aus einer Obersicht...nicht durch Auswahl der besten geantwortet werden.',
    w:
      ('kann hier nicht deduktiv, nicht aus einer Obersicht...nicht durch Auswahl der besten geantwortet werden.'
        .length /
        2) *
      10 *
      FONT_SIZE,
    s: { fontSize: 10 },
    o: 0.5,
    id: 'no-answer',
  },
  {
    t: 'Verweisungsmoglichkeiten',
    w: 'Verweisungsmoglichkeiten'.length * 18 * FONT_SIZE,
    s: { fontSize: 18 },
    o: 0.8,
    id: 'linking',
  },
  {
    t: 'den Prozeß des Wiederfindens',
    w: 'den Prozeß des Wiederfindens'.length * 15 * FONT_SIZE,
    s: { fontSize: 15 },
    o: 0.7,
    id: 'registry',
  },
  {
    t: 'Stellordnung',
    w: 'Stellordnung'.length * 19,
    s: { fontSize: 19 },
    o: 0.8,
    id: 'ordering',
  },
  {
    t: 'gegen eine systematiscbe Ordnung',
    w: 'gegen eine systematiscbe Ordnung'.length * 20 * FONT_SIZE,
    s: { fontSize: 20 },
    o: 0.7,
    id: 'without-order',
  },
  {
    t: 'Systemtheorie',
    w: 'Systemtheorie'.length * 24 * FONT_SIZE,
    s: { fontSize: 24 },
    o: 0.7,
    id: 'systems',
  },
  {
    t: 'Aber Kommunikation?',
    w: 'Aber Kommunikation?'.length * 36 * FONT_SIZE,
    s: { fontSize: 36 },
    o: 0.6,
    id: 'communication',
  },
  {
    t: 'Inkorporierung von Zufall',
    w: 'Inkorporierung von Zufall'.length * 14,
    s: { fontSize: 14 },
    o: 0.8,
    id: 'chance',
  },
  {
    t: 'eine Art Zweitgedächtnis, ein alter Ego',
    w: 'eine Art Zweitgedächtnis, ein alter Ego'.length * 24 * FONT_SIZE,
    s: { fontSize: 24 },
    o: 0.9,
    id: 'alter-ego',
  },
  {
    t: 'die entsprechende Kombination von Ordnung und Unordnung',
    w:
      ('die entsprechende Kombination von Ordnung und Unordnung'.length / 2) *
      13 *
      FONT_SIZE,
    s: { fontSize: 13 },
    o: 0.6,
    id: 'order-disorder',
  },
  {
    t: 'Wachstum nach innen',
    w: 'Wachstum nach innen'.length * 17 * FONT_SIZE,
    s: { fontSize: 17 },
    o: 0.4,
    id: 'growth-from-inside',
  },
  {
    t: 'können wir bestatigen.',
    w: 'können wir bestatigen.'.length * 16 * FONT_SIZE,
    s: { fontSize: 16 },
    o: 0.8,
    id: 'assured',
  },
]

export async function loader() {
  return await generatePrompt('What is a Zettelkasten?')
}

function ClientIndex() {
  const [data, setData] = useState<{ event: 'start' | 'explode' }>({
    event: !document.referrer ? 'start' : 'explode',
  })

  const gptText = useLoaderData<typeof loader>()

  const { w } = useDimensions()

  const titleRef = useRef<HTMLButtonElement>(null)
  useFlicker(titleRef, {
    go: data.event === 'explode',
    key: 'opacity',
    from: { max: 1, min: 0 },
    to: { max: 0, min: 0 },
    duration: 600,
  })

  return (
    <div className='relative h-screen w-screen child:absolute'>
      <button
        onClick={() =>
          data.event === 'start' && setData({ ...data, event: 'explode' })
        }
        className='left-1/2 top-1/2'
        style={{
          fontSize: ((w * 2) / 'zettelkablooey'.length) * 0.25,
        }}
        ref={titleRef}
      >
        zettelkablooey
      </button>
      {data.event === 'explode' && <Kablooey text={index} gptText={gptText} />}
    </div>
  )
}
