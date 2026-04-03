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
export function useSearchParams(): [URLSearchParams, (params: URLSearchParams) => void] {
  const params = useNextSearchParams()
  // Convert ReadonlyURLSearchParams → URLSearchParams for full compat
  const mutableParams = new URLSearchParams(params.toString())
  // Setter is a no-op shim (use router.push for actual navigation)
  const setSearchParams = (_p: URLSearchParams) => {}
  return [mutableParams, setSearchParams]
}

// ---------------------------------------------------------------------------
// Navigate component — renders null, triggers push on mount
// (Only used for redirect cases; prefer next.config.mjs redirects instead)
// ---------------------------------------------------------------------------
import { useEffect } from 'react'

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
