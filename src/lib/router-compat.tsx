'use client'

/**
 * router-compat.ts
 *
 * Drop-in compatibility shim: re-exports Next.js navigation utilities
 * with the same interface as react-router-dom.
 *
 * Usage: replace `from '@/lib/router-compat'` with `from '@/lib/router-compat'`
 * throughout the codebase — no changes to individual hook call-sites needed.
 */

import NextLink from 'next/link'
import type { ComponentProps } from 'react'

// Compat Link: maps react-router-dom's `to` prop to Next.js `href`.
// Also accepts `href` directly for code already updated.
type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  to?: string
  href?: string
  replace?: boolean
}

export function Link({ to, href, replace, ...rest }: LinkProps) {
  return <NextLink href={to || href || '/'} replace={replace} {...rest} />
}

import { useCallback, useEffect } from 'react'
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
    to: string | number,
    options?: { replace?: boolean; state?: unknown }
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
// useLocation — matches react-router-dom's return shape
// ---------------------------------------------------------------------------
export function useLocation() {
  const pathname = usePathname()
  const searchParams = useNextSearchParams()
  const search = searchParams.toString() ? `?${searchParams.toString()}` : ''
  return {
    pathname,
    search,
    hash: '',
    state: null,
    key: 'default',
  }
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

// ---------------------------------------------------------------------------
// Navigate component — renders null, triggers push on mount
// (Only used for redirect cases; prefer next.config.mjs redirects instead)
// ---------------------------------------------------------------------------
export function Navigate({
  to,
  replace = false,
}: {
  to: string
  replace?: boolean
}) {
  const router = useRouter()
  useEffect(() => {
    if (replace) {
      router.replace(to)
    } else {
      router.push(to)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}
