import { animated, useSpring, useSprings } from '@react-spring/web'
import _ from 'lodash'
import { Vector } from 'matter-js'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDimensions, useFlicker, useFlickers } from '~/utils'

export default function Index() {
  return (
    <Suspense fallback={<></>}>
      <ClientIndex />
    </Suspense>
  )
}

function ClientIndex() {
  const [data, setData] = useState<{ event: 'start' | 'explode' }>({
    event: 'start',
  })

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
    <div className='relative h-full w-full child:absolute child:-translate-x-1/2 child:-translate-y-1/2'>
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
      {data.event === 'explode' && <Explosion />}
    </div>
  )
}

function Explosion() {
  const { w, h } = useDimensions()
  const text: {
    t: string
    w: number
    s: React.CSSProperties
    id: string
    o: number
  }[] = [
    {
      t: 'zettelkasten: a moment of space between offerings',
      w: 150,
      s: { fontSize: 12 },
      o: 1,
      id: 'luhmann',
    },
    {
      t: 'Auf diese Frage kann hier nicht deduktiv, nicht aus einer Obersicht über alle Moglichkeiten und nicht durch Auswahl der besten geantwortet werden.',
      w: 400,
      s: { fontSize: 10 },
      o: 1,
      id: 'frage',
    },
    {
      t: 'Verweisungsmoglichkeiten',
      w: 200,
      s: { fontSize: 18 },
      o: 1,
      id: 'verweisungs',
    },
  ]

  const [springs, api] = useSprings(
    text.length,
    (i) => ({
      from: Vector.create(w / 2, h / 2),
      to: Vector.create(_.random(w - text[i].w, true), _.random(h - 50, true)),
      config: {
        damping: 500,
        friction: 10 * _.random(0.9, 1.1),
        tension: 200 * _.random(0.8, 1.2),
      },
    }),
    []
  )

  useFlickers(
    text.map((fragment) => '#' + fragment.id),
    (i) => ({
      from: { min: 0, max: text[i].o },
      to: { min: text[i].o, max: text[i].o },
      duration: 2000 * _.random(0.8, 1.2),
      key: 'opacity',
      go: true,
    })
  )

  return (
    <>
      {text.map((fragment, i) => (
        <animated.div
          key={fragment.t}
          id={fragment.id}
          style={{ width: fragment.w, ...fragment.s, ...springs[i] }}
        >
          {fragment.t}
        </animated.div>
      ))}
    </>
  )
}
