// Name, role and focus of the two named experts. Kept apart from the article
// lists in authors.ts so client components (bylines) can import it without
// pulling every article title into the bundle.

export interface AuthorProfile {
  slug: string;
  name: string;
  jobTitle: string;
  /** One line on what the author covers. */
  focus: string;
}

export const AUTHOR_PROFILES: AuthorProfile[] = [
  {
    slug: "aymen-elmardi",
    name: "Aymen Elmardi",
    jobTitle: "Payments Expert",
    focus: "Writes on payment risk, compliance, provider deep dives and marketplace payments.",
  },
  {
    slug: "madalsa-bhat",
    name: "Madalsa Bhat",
    jobTitle: "Growth Expert",
    focus: "Writes on processing fees, pricing and provider comparisons.",
  },
];

export const authorUrl = (slug: string) => `https://chosepayments.com/authors/${slug}`;

export const getAuthorProfile = (slug: string) => AUTHOR_PROFILES.find((author) => author.slug === slug);
