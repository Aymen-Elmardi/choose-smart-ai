import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AuthorProfile from '@/views/AuthorProfile'
import { AUTHORS, getAuthor } from '@/data/authors'

export const dynamicParams = false

export function generateStaticParams() {
  return AUTHORS.map((author) => ({ slug: author.slug }))
}

const META: Record<string, { title: string; description: string }> = {
  'aymen-elmardi': {
    title: 'Aymen Elmardi: Payments Expert and Author | ChosePayments',
    description:
      'Aymen Elmardi, Payments Expert at ChosePayments, writes on payment risk, compliance, provider deep dives and marketplace payments. Browse every article here.',
  },
  'madalsa-bhat': {
    title: 'Madalsa Bhat: Growth Expert and Author | ChosePayments',
    description:
      'Madalsa Bhat, Growth Expert at ChosePayments, writes on payment processing fees, pricing and provider comparisons. Browse every article by Madalsa Bhat here.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const meta = META[slug]
  if (!meta) return {}
  const path = `/authors/${slug}`
  return {
    // `absolute` opts out of the root layout's '%s | ChosePayments' template;
    // these titles already end in the brand.
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      url: `https://chosepayments.com${path}`,
      images: ['/og-default.png'],
      title: meta.title,
      description: meta.description,
      type: 'profile',
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = getAuthor(slug)
  if (!author) notFound()
  return <AuthorProfile author={author} />
}
