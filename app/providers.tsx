'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { installGlobalErrorReporting } from '@/lib/errorReporting'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  // Stable QueryClient instance (not recreated on every render)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )

  // Rejected promises and errors thrown outside the render tree never reach a
  // React error boundary. Without these the only failures we would ever hear
  // about are the ones that happen to crash a component.
  useEffect(() => {
    installGlobalErrorReporting()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
