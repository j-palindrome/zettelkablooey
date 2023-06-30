import { Container, Sprite, Stage, Text } from '@pixi/react'
import { useSpring, animated, useSprings } from '@react-spring/web'
import { BlurFilter, TextStyle } from 'pixi.js'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { ClientOnly } from 'remix-utils'
import { defaultStyle } from '~/models/text'
import { repulsiveBody, useDimensions, useMatter } from '~/utils'
import Matter, { Bodies, Body, Vector, Constraint } from 'matter-js'
import _ from 'lodash'
import {
  b2BodyType,
  b2PolygonShape,
  b2Shape,
  b2Vec2,
  b2World,
} from '@box2d/core'
import invariant from 'tiny-invariant'
import stylesheet from '~/tailwind.css'
import { Render } from 'react-matter-js'
// @ts-ignore
import attractors from 'matter-attractors'

export default function Index() {
  return (
    <Suspense fallback={<></>}>
      <ClientIndex />
    </Suspense>
  )
}

Matter.use(attractors)

function ClientIndex() {
  const [data, setData] = useState<{ event: 'start' | 'explode' }>({
    event: 'start',
  })

  const { w, h } = useDimensions()

  return (
    <div className='relative h-full w-full child:absolute child:-translate-x-1/2 child:-translate-y-1/2'>
      <button
        onClick={() =>
          data.event === 'start' && setData({ ...data, event: 'explode' })
        }
        className='left-1/2 top-1/2'
        style={{ fontSize: ((w * 2) / 'zettelkablooey'.length) * 0.25 }}
      >
        zettelkablooey
      </button>
      {data.event === 'explode' && <Explosion />}
    </div>
  )
}

function Explosion() {
  const { w, h } = useDimensions()
  const text: { t: string; w: number; s: React.CSSProperties }[] = [
    {
      t: 'zettelkasten: a moment of space between offerings',
      w: 100,
      s: { fontSize: 12, opacity: 0.7 },
    },
    {
      t: 'Auf diese Frage kann hier nicht deduktiv, nicht aus einer Obersicht über alle Moglichkeiten und nicht durch Auswahl der besten geantwortet werden.',
      w: 400,
      s: { fontSize: 10, opacity: 0.5 },
    },
  ]

  const [springs, api] = useSprings(
    text.length,
    (i) => ({
      from: Vector.create(w / 2, h / 2),
      to: Vector.add(
        Vector.create(w / 2, h / 2),
        Vector.rotate(
          Vector.create(0, _.random(50, w * 0.5 - )),
          _.random(Math.PI * 2, true)
        )
      ),
      config: {
        damping: 100,
        friction: 5 + _.random(5.0),
        tension: 50 * _.random(0.8, 1.2),
      },
    }),
    []
  )

  // const grounds = useMemo(
  //   () => [
  //     Bodies.rectangle(w / 2, h - 5, w * 1.5, 10, {
  //       isStatic: true,
  //       label: 'ground-b',
  //     }),
  //     Bodies.rectangle(w / 2, 5, w * 1.5, 10, {
  //       isStatic: true,
  //       label: 'ground-t',
  //     }),
  //     Bodies.rectangle(5, h / 2, 10, h * 1.5, {
  //       isStatic: true,
  //       label: 'ground-l',
  //     }),
  //     Bodies.rectangle(w - 5, h / 2, 10, h * 1.5, {
  //       isStatic: true,
  //       label: 'ground-r',
  //     }),
  //   ],
  //   []
  // )

  // const texts = useMemo(
  //   () =>
  //     text.map((text) => {
  //       const body = Bodies.rectangle(
  //         w / 2 + _.random(30),
  //         h / 2 + _.random(30),
  //         25,
  //         50,
  //         {
  //           label: text.id,
  //         }
  //       )

  //       const vector = Vector.rotate(
  //         Vector.create(-0.05, 0),
  //         _.random(Math.PI, true)
  //       )
  //       Body.applyForce(body, body.position, vector)

  //       return body
  //     }),
  //   []
  // )

  // useMatter(
  //   [
  //     ...grounds,
  //     ...texts,
  //     ...texts.flatMap((text) =>
  //       [
  //         { x: 0, y: 0 },
  //         { x: w, y: 0 },
  //         { x: w, y: h },
  //         { x: 0, y: h },
  //       ]
  //         .map((point) =>
  //           Constraint.create({
  //             bodyA: text,
  //             pointB: point,
  //             length: h,
  //             stiffness: 1e-4,
  //             damping: 1e-4,
  //           })
  //         )
  //         .concat([
  //           Constraint.create({
  //             bodyA: text,
  //             pointB: { x: w / 2, y: h / 2 },
  //             length: h / 4,
  //             stiffness: 1e-4,
  //             damping: 1e-4,
  //           }),
  //         ])
  //     ),
  //   ],
  //   () => {
  //     for (let body of texts) {
  //       const el = document.getElementById(body.label)
  //       invariant(el)
  //       el.style.top = `${body.position.y}px`
  //       el.style.left = `${body.position.x}px`
  //     }
  //   },
  //   (world, engine) => {
  //     world.gravity.x = 0
  //     world.gravity.y = 0
  //     const render = Matter.Render.create({ engine })
  //     Matter.Render.run(render)
  //   }
  // )

  return (
    <>
      {text.map((fragment, i) => (
        <animated.div
          key={fragment.t}
          style={{ width: fragment.w, ...fragment.s, ...springs[i] }}
        >
          {fragment.t}
        </animated.div>
      ))}
    </>
  )
}
