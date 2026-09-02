import { notFound } from 'next/navigation';
import { Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import posts from '@/lib/posts';
import { ArrowLeft, Clock, Calendar, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import NewsletterCTA from '@/components/NewsletterCTA';
import VisitTracker from '@/app/(marketing)/components/VisitTracker';
import BlogPostTracker from '@/app/(marketing)/components/BlogPostTracker';
import ShareButton from '@/app/(site)/blog/[slug]/ShareButton';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return { title: 'Artículo no encontrado' };
  }

  return {
    title: `${post.title} | Tu Marca AR`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostTracker slug={resolvedParams.slug} title={post.title}>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
        
        {/* Background Effects Premium */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <article className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24">
          
          <VisitTracker pageName={`blog-post-${resolvedParams.slug}`} />

          {/* Back Button */}
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 text-sm font-medium mb-10 transition-all duration-300 hover:translate-x-1"
          >
            <div className="w-8 h-8 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all">
              <ArrowLeft size={16} />
            </div>
            Volver al blog
          </Link>

          {/* Header */}
          <header className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/10 to-purple-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold px-4 py-1.5 rounded-full">
                <Sparkles size={14} />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>
            
            <h1 className={`${playfair.className} text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent`}>
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <Calendar size={14} />
              <span>Publicado el {new Date(post.publishedAt).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] mb-12 rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl shadow-black/50 group">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-40 z-10" />
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
              priority
            />
          </div>

          {/* Article Content - Premium Prose Styling */}
          <div
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-semibold prose-headings:text-white prose-headings:mb-4 prose-headings:mt-10
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-a:transition-colors
              prose-strong:text-white prose-strong:font-semibold
              prose-blockquote:border-l-amber-500 prose-blockquote:bg-gray-900/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-gray-300 prose-blockquote:italic
              prose-code:bg-gray-800 prose-code:text-amber-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share / Actions Bar (AHORA FUNCIONAL) */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex items-center justify-between">
            <span className="text-gray-500 text-sm">¿Te resultó útil?</span>
            <ShareButton title={post.title} />
          </div>

          {/* Newsletter CTA in Premium Card */}
          <div className="mt-16">
            <div className="relative bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12 text-center overflow-hidden group hover:border-amber-500/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className={`${playfair.className} text-2xl md:text-3xl font-semibold text-white mb-4`}>
                  ¿Te sirvió este artículo?
                </h3>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                  Suscríbete y recibí cada semana estrategias prácticas para potenciar tu marca, directo a tu bandeja de entrada.
                </p>
                <NewsletterCTA />
              </div>
            </div>
          </div>

        </article>
      </div>
    </BlogPostTracker>
  );
}