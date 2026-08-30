import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft } from "lucide-react";
import ListPageHero from "@/components/ui/ListPageHero";
import SharePopover from "@/components/resources/SharePopover";
import { formatDate, type BlogPost } from "@/lib/blog";

/**
 * Blog article. A server component — the title, date and body all land in the
 * initial HTML so crawlers see the post without running JavaScript. Only the
 * share popover needs the client.
 */
export default function BlogDetail({ post }: { post: BlogPost }) {
  return (
    <main>
      <ListPageHero
        title="Blog Posts"
        titleAs="p"
        breadcrumb={[{ name: "Resources", href: "/resources" }, { name: post.title }]}
      />

      <section className="bg-section pb-20">
        <div className="site-container px-6">
          <div
            className="bg-white rounded-3xl shadow-sm overflow-hidden relative z-10 px-8 pt-8 pb-0"
            style={{ marginTop: -40 }}
          >
            {/* Back link */}
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm text-base hover:text-primary transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All Blog Posts
            </Link>

            {/* Category tag */}
            {post.category && (
              <div className="mb-4">
                <span className="inline-block bg-highlight text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/20">
                  {post.category}
                </span>
              </div>
            )}

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Date + share */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2 text-base text-sm font-medium">
                <Calendar className="w-4 h-4" />
                {post.date ? (
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                ) : null}
              </div>
              <SharePopover title={post.title} />
            </div>

            {/* ── Hero image ── */}
            {post.img && (
              <div className="flex justify-center pt-8 hidden">
                <Image
                  src={post.img}
                  alt={post.altText}
                  width={900}
                  height={506}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  style={{ height: "auto", width: "60%", borderRadius: "1.25rem" }}
                  unoptimized
                  priority
                />
              </div>
            )}

            {/* ── Article body ──
                `post.content` is sanitised server-side in lib/blog.ts before it
                reaches this point; scripts and event handlers are already gone. */}
            <div
              className="blog-content py-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-14 bg-highlight">
        <div className="site-container px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Ready to Start Your Research?
              </h3>
              <p className="text-gray-900 text-base leading-8 font-medium">
                Partner with Track Opinion for expert market research solutions tailored to
                your business needs.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact-us"
                className="bg-primary hover:opacity-90 text-white text-base font-bold px-10 py-5 rounded-lg transition-all duration-300 shadow hover:-translate-y-0.5 whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
