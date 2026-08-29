'use client'

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Lazy singleton — only created when first accessed (client-side only)
let _supabase: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Error handed back by the no-op client, shaped like a Supabase error so the
 * `if (error)` branch every call site already has does the right thing.
 */
export const SUPABASE_NOT_CONFIGURED = 'SUPABASE_NOT_CONFIGURED';

const notConfiguredError = () => ({
  name: SUPABASE_NOT_CONFIGURED,
  message:
    'Supabase is not configured: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are unset.',
  details: '',
  hint: '',
  code: SUPABASE_NOT_CONFIGURED,
});

/**
 * Stand-in used during SSR/build and whenever the Supabase env vars are absent.
 *
 * Property access returns the proxy again so arbitrary builder chains
 * (`.from().select().eq().maybeSingle()`, `.functions.invoke()`) keep working,
 * but awaiting any point in the chain resolves to Supabase's standard
 * `{ data, error }` shape.
 *
 * This matters because the proxy is truthy for every property: an earlier
 * version returned `undefined` for `then`, so `await` yielded the proxy itself
 * and destructuring `{ data }` produced a proxy rather than a value. Callers
 * then put that proxy into React state, and rendering it threw
 * "Cannot convert object to primitive value", taking out the whole page via the
 * app error boundary. Resolving to `data: null` keeps failures inert.
 */
function createNoopClient(): any {
  const noop: any = new Proxy(function () {} as any, {
    get(_target, prop) {
      // Make the chain awaitable and thenable-compliant.
      if (prop === 'then') {
        return (onFulfilled?: (v: unknown) => unknown, onRejected?: unknown) =>
          Promise.resolve({ data: null, error: notConfiguredError() }).then(
            onFulfilled,
            onRejected as never
          );
      }
      if (prop === 'catch' || prop === 'finally') {
        return () => Promise.resolve({ data: null, error: notConfiguredError() });
      }
      return noop;
    },
    apply: () => noop,
  });
  return noop;
}

export function getSupabaseClient() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key || typeof window === 'undefined') {
      // During SSR/build, or with env vars missing, return a no-op client.
      // All actual Supabase calls happen client-side anyway.
      return createNoopClient() as ReturnType<typeof createClient<Database>>;
    }

    _supabase = createClient<Database>(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return _supabase;
}

// Keep the named export for backwards-compat with all existing `import { supabase }`
// Uses a Proxy so the client is only created on first property access (client-side)
export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(_target, prop) {
    return getSupabaseClient()[prop as keyof ReturnType<typeof createClient<Database>>];
  },
});
