import { useSprings, animated } from '@react-spring/web'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import _ from 'lodash'
import { Vector } from 'matter-js'
import { useMemo, useState } from 'react'
import { useFlicker, useFlickers } from '~/services/animation'
import { useDimensions, useMousePosition } from '~/services/dom.client'
import { lerp } from '~/services/math'
import { useFakeStream } from '~/services/text.client'

export default function Kablooey({
  text,
  gptText,
}: {
  text: string
  gptText: string
}) {
  const animatedGptText = useFakeStream(gptText, { speed: 50 })

  const { w, h } = useDimensions()

  const textMap = convertTextToLines(text)

  const mousePosition = useMousePosition()
  const randomVectors = useMemo(
    () =>
      text.map((fragment) =>
        Vector.create(_.random(w - fragment.w, true), _.random(h - 50, true))
      ),
    []
  )

  const [springs, api] = useSprings(
    text.length,
    (i) => {
      const toMouse = Vector.sub(randomVectors[i], mousePosition)
      return {
        from: Vector.create(w / 2, h / 2),
        to: Vector.add(
          randomVectors[i],
          Vector.mult(
            Vector.normalise(toMouse),
            lerp(20, 0, Vector.magnitude(toMouse) / w, { clamp: true })
          )
        ),
        config: {
          damping: 500,
          friction: 10 * _.random(0.9, 1.1),
          tension: 250 * _.random(0.8, 1.2),
        },
      }
    },
    [mousePosition]
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

  const [over, setOver] = useState<string>('')
  useFlicker(over ? '#' + over : '', {
    go: !!over,
    from: { max: 1, min: 0 },
    key: 'opacity',
    resetTo: text.find((el) => el.id === over)?.o,
  })

  return (
    <>
      <div className='left-0 top-0 h-full w-full overflow-hidden opacity-20'>
        {animatedGptText}
      </div>
      {text.map((fragment, i) => (
        <animated.div
          className='z-30'
          key={fragment.t}
          id={fragment.id}
          style={{
            width: fragment.w,
            ...fragment.s,
            ...springs[i],
          }}
          onMouseEnter={() => setOver(fragment.id)}
          onMouseLeave={() => setOver('')}
        >
          <Link to={fragment.id}>{fragment.t}</Link>
        </animated.div>
      ))}
      <div className='fixed left-0 top-0 z-0 h-screen w-screen'>
        <Outlet />
      </div>
    </>
  )
}
