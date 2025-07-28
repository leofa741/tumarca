import { notFound } from 'next/navigation';
import { Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import posts from '@/lib/posts';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

// Configuración de la fuente
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

// Genera las rutas estáticas para cada artículo del blog
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Genera metadatos dinámicos (SEO) para cada artículo
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>; // ✅ params es una promesa
}): Promise<Metadata> {
  const resolvedParams = await params; // ✅ Esperamos la promesa
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

// Página principal del artículo del blog
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>; // ✅ params como promesa
}) {
  const resolvedParams = await params; // ✅ Esperamos el valor real
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound(); // Muestra página 404 si no existe
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      {/* Botón para volver al blog */}
      <Link
        href="/blog"
        className="inline-flex items-center text-amber-500 hover:text-amber-400 text-sm font-medium mb-8 transition"
      >
        <ArrowLeft size={16} className="mr-1" /> Volver al blog
      </Link>

      {/* Encabezado del artículo */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-amber-500/90 text-black text-xs font-bold px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">• {post.readTime}</span>
        </div>
        <h1
          className={`${playfair.className} text-3xl md:text-5xl font-semibold text-white leading-tight`}
        >
          {post.title}
        </h1>
        <p className="text-gray-400 mt-4">
          Publicado el{' '}
          {new Date(post.publishedAt).toLocaleDateString('es-AR')}
        </p>
      </header>

      {/* Imagen destacada */}
      <div className="relative mb-10 h-64 md:h-96">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover rounded-lg shadow-lg transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Contenido del artículo */}
      <div
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Sección de llamado a la acción (newsletter) */}
      <div className="mt-16 text-center border-t border-gray-800 pt-10">
        <h3 className="text-2xl font-semibold text-white mb-4">
          ¿Te sirvió este artículo?
        </h3>
        <p className="text-gray-400 mb-6">
          Suscríbete y recibí cada semana estrategias prácticas para potenciar tu marca.
        </p>
        <Link
          href="/newsletter"
          className="inline-block px-8 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition"
        >
          🔔 Recibir tips exclusivos
        </Link>
      </div>
    </article>
  );
}