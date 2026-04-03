'use client'

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Lazy singleton — only created when first accessed (client-side only)
let _supabase: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key || typeof window === 'undefined') {
      // During SSR/build, return a no-op proxy.
      // All actual Supabase calls happen client-side anyway.
      const noopProxy: any = new Proxy(() => noopProxy, {
        get: (_t, p) => (p === 'then' ? undefined : noopProxy),
        apply: () => noopProxy,
      });
      return noopProxy as ReturnType<typeof createClient<Database>>;
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
