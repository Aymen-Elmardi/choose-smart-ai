import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { authorUrl, type Author } from "@/data/authors";

const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

const AuthorProfile = ({ author }: { author: Author }) => {
  const url = authorUrl(author.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    mainEntity: {
      "@type": "Person",
      "@id": `${url}#person`,
      name: author.name,
      jobTitle: author.jobTitle,
      url,
      worksFor: { "@id": "https://chosepayments.com/#organization" },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <Header />

      <main className="pt-24 pb-16">
        <div className="section-container">
          <article className="max-w-2xl mx-auto">
            <header className="flex items-center gap-5 mb-10">
              {/* TODO(owner): replace the initials with a photo (square, at least 256px). */}
              <div
                aria-hidden="true"
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary"
              >
                {initials(author.name)}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">{author.name}</h1>
                <p className="mt-1 text-lg text-muted-foreground">{author.jobTitle}, ChosePayments</p>
              </div>
            </header>

            {/* TODO(owner): add a short bio (background, years in payments, areas of work). */}
            <p className="text-muted-foreground leading-relaxed mb-12">{author.focus}</p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Articles by {author.name} ({author.articles.length})
              </h2>
              <ul className="space-y-3">
                {author.articles.map((article) => (
                  <li key={article.href}>
                    <Link href={article.href} className="text-primary hover:underline">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorProfile;
