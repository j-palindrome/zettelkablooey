import { b2Body, b2BodyType, b2Vec2, b2World } from '@box2d/core'
import { useMatches, useOutletContext } from '@remix-run/react'
import { RemixContext } from '@remix-run/react/dist/components'
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
import { useEffect, useMemo, useRef, useState } from 'react'
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
