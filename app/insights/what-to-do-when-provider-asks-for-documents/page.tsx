import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhatToDoWhenProviderAsksForDocuments from '@/views/insights/WhatToDoWhenProviderAsksForDocuments'

export const metadata: Metadata = {
  title: 'What To Do When a Payment Provider Asks for More Documents | ChosePayments',
  description: 'Learn why payment providers request additional documents, what these requests mean, and how to respond confidently. Includes a document checklist.',
  alternates: { canonical: '/insights/what-to-do-when-provider-asks-for-documents' },
  openGraph: { title: 'What To Do When a Payment Provider Asks for More Documents | ChosePayments', description: 'Learn why payment providers request additional documents and how to respond confidently.', type: 'article' },
}

export default function Page() {
  return (
    <Suspense>
      <WhatToDoWhenProviderAsksForDocuments />
    </Suspense>
  )
}
