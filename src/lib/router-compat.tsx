'use client'

/**
 * router-compat.ts
 *
 * Compatibility shim left over from the Vite + react-router era, kept so the
 * ~120 call sites did not all have to change during the Next.js migration.
 *
 * It is deliberately NOT a faithful react-router implementation. Anything this
 * shim cannot actually do has been removed rather than stubbed, so callers get
 * a compile error instead of a value that is silently always wrong. Router
 * state and `location.search` are the two notable absences.
 *
 * `Link` has been migrated out: all 118 call sites now import next/link
 * directly. What remains is three hooks used by three files — Quiz,
 * NotFound and Recommendation. This file goes away once those move to
 * next/navigation.
 */

import { useCallback } from 'react'
import {
  useRouter,
  usePathname,
  useSearchParams as useNextSearchParams,
} from 'next/navigation'

// ---------------------------------------------------------------------------
// useNavigate — matches react-router-dom's signature:
//   navigate('/path')           → router.push('/path')
//   navigate('/path', { replace: true }) → router.replace('/path')
//   navigate(-1)                → router.back()
// ---------------------------------------------------------------------------
export function useNavigate() {
  const router = useRouter()
  return (
    // `state` is deliberately absent. react-router's navigate accepts it, but
    // there is no router state to carry it in, so it was accepted and dropped
    // on the floor — a caller passing it got no error and no effect.
    to: string | number,
    options?: { replace?: boolean }
  ) => {
    if (typeof to === 'number') {
      if (to === -1) router.back()
      return
    }
    if (options?.replace) {
      router.replace(to)
    } else {
      router.push(to)
    }
  }
}

// ---------------------------------------------------------------------------
// useLocation — pathname only.
//
// Deliberately narrower than react-router's location. The previous version
// returned `search`, `hash`, `state` and `key` too, but three of those were
// hardcoded empty and could never be anything else: there is no router state
// to carry, so `state: null` silently broke every caller that read it. Callers
// now get a type error instead of a value that is always wrong.
//
// It also called useSearchParams to build `search`, which nothing read. That
// one call opted every route rendering a useLocation consumer out of static
// rendering entirely — Next bails a page to client-side rendering when it sees
// useSearchParams, which is why /assessment shipped no prerendered content.
// ---------------------------------------------------------------------------
export function useLocation(): { pathname: string } {
  return { pathname: usePathname() }
}

// ---------------------------------------------------------------------------
// useSearchParams — wraps Next.js's useSearchParams to expose the same
// .get() / .getAll() interface that react-router-dom provides
// ---------------------------------------------------------------------------
type SearchParamsInit =
  | URLSearchParams
  | ((prev: URLSearchParams) => URLSearchParams)

type SetSearchParams = (
  next: SearchParamsInit,
  options?: { replace?: boolean }
) => void

export function useSearchParams(): [URLSearchParams, SetSearchParams] {
  const params = useNextSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Referentially stable: callers put this in effect dependency arrays, and an
  // identity that changed every render would re-run the effect after the
  // navigation it triggers, looping.
  const setSearchParams = useCallback<SetSearchParams>(
    (next, options) => {
      // Read live rather than closing over `params`, so the callback can stay
      // out of this hook's dependency list.
      const current = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : ''
      )
      const resolved = typeof next === 'function' ? next(current) : next
      const query = resolved.toString()
      const url = query ? `${pathname}?${query}` : pathname
      // scroll: false — these are same-page query edits, not navigations the
      // reader asked for; jumping to the top would be wrong.
      if (options?.replace) router.replace(url, { scroll: false })
      else router.push(url, { scroll: false })
    },
    [router, pathname]
  )

  // Convert ReadonlyURLSearchParams → URLSearchParams for full compat
  return [new URLSearchParams(params.toString()), setSearchParams]
}
