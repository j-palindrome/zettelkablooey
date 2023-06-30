import { b2Body, b2BodyType, b2Vec2, b2World } from '@box2d/core'
import { useMatches, useOutletContext } from '@remix-run/react'
import { RemixContext } from '@remix-run/react/dist/components'
import _ from 'lodash'
import math from 'mathjs'
import Matter, {
  Bodies,
  Engine,
  Render,
  World,
  Constraint,
  Body,
  Runner,
  Events,
  IEngineDefinition,
  Vector,
} from 'matter-js'
import p5 from 'p5'
import {
  RefObject,
  StyleHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import invariant from 'tiny-invariant'

const DEFAULT_REDIRECT = '/'

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== 'string') {
    return defaultRedirect
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return defaultRedirect
  }

  return to
}

export const useDimensions = () => {
  const [{ w, h }, setDimensions] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  })

  useEffect(() => {
    const updateSize = () =>
      setDimensions({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return { w, h }
}

export const useMatter = (
  bodies: (Body | Constraint)[],
  draw: (bodies: Body[], timestamp: number) => void,
  setup?: (world: World, engine: Engine) => void
) => {
  const engine = useRef(Engine.create())
  useEffect(() => {
    World.add(engine.current.world, bodies as Body[])
    Runner.run(engine.current)
    Events.on(engine.current, 'beforeUpdate', (ev) =>
      draw(engine.current.world.bodies, ev.timestamp)
    )

    if (setup) setup(engine.current.world, engine.current)

    return () => {
      World.clear(engine.current.world, false)
      Engine.clear(engine.current)
    }
  }, [])
}

export const repulsiveBody = (max_distance: number, scale: number) => {
  return (thisBody: Body, thatBody: Body) => {
    const diff = Vector.sub(thatBody.position, thisBody.position)
    return Vector.mult(
      Vector.normalise(diff),
      Math.max(0, max_distance - Vector.magnitude(diff)) * scale
    )
  }
}

/**
 * @param el: either a document.querySelector string or a ref to an HTMLElement.
 */
export const useFlicker = (
  el: RefObject<HTMLElement> | string,
  {
    go,
    key,
    from,
    to,
    duration,
    units,
  }: {
    go: boolean
    key: keyof CSSStyleDeclaration
    from: { max: number; min: number }
    to: { max: number; min: number }
    duration: number
    units?: 'px' | 'vw' | 'vh' | '%' | ((amount: number) => string)
  }
) => {
  const currentFlicker = useRef<{ max: number; min: number }>({ ...from })
  const startTime = useRef<number>()

  useEffect(() => {
    const flicker: FrameRequestCallback = (currentTime: number) => {
      if (!startTime.current) startTime.current = currentTime

      const element =
        typeof el === 'string'
          ? (document.querySelector(el) as HTMLElement)
          : el.current

      invariant(element)
      const amount = _.round(
        _.random(currentFlicker.current.min, currentFlicker.current.max, true),
        3
      )

      const unitAmount =
        typeof units === 'function' ? units(amount) : `${amount}${units ?? ''}`
      element.style.setProperty(key as string, unitAmount)

      const progress = (currentTime - startTime.current) / duration

      currentFlicker.current.max = lerp(from.max, to.max, progress)
      currentFlicker.current.min = lerp(from.min, to.min, progress)
      if (progress > 1.0) return
      if (go) requestAnimationFrame(flicker)
    }

    if (go) {
      requestAnimationFrame(flicker)
    }
  }, [go])
}

export const useFlickers = (
  els: Parameters<typeof useFlicker>[0][],
  config:
    | Parameters<typeof useFlicker>[1]
    | Parameters<typeof useFlicker>[1][]
    | ((index: number) => Parameters<typeof useFlicker>[1])
) => {
  let i = 0
  if (typeof config === 'function') {
    for (let el of els) {
      useFlicker(el, config(i))
      i++
    }
  } else if (config instanceof Array) {
    for (let el of els) {
      invariant(config[i], 'Not enough configs in list')
      i++
      useFlicker(el, config[i])
    }
  } else {
    for (let el of els) {
      useFlicker(el, config)
    }
  }
}

export const lerp = (a: number, b: number, progress: number) => {
  return a + (b - a) * progress
}
