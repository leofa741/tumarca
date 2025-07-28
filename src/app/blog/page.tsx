// app/blog/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { BookOpen, PenTool, Zap, Target } from 'lucide-react';
import type { Metadata } from "next";
import posts from '@/lib/posts';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'Blog de Branding y Marketing Digital | Tu Marca AR',
  description: 'Aprende a construir una marca poderosa, diseñar sitios web que convierten y crecer con estrategia. Tips reales para emprendedores y pequeñas empresas.',
  openGraph: {
    title: 'Blog | Tu Marca AR - Estrategia de Marca y Crecimiento Digital',
    description: 'Guías prácticas sobre branding, diseño web, marketing emocional y lanzamientos exitosos. Transforma tu negocio desde la esencia.',
    images: [
      {
        url: '/logo-tumarca.png',
        width: 800,
        height: 600,
        alt: 'Tu Marca AR - Blog de Estrategia de Marca',
      },
    ],
  },
};

export default function BlogPage() {
  return (
    <section className="container mx-auto px-6 py-16 md:py-24 lg:py-32">
      {/* Encabezado */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <BookOpen className="mx-auto text-amber-500" size={48} />
        <h1 className={`${playfair.className} text-4xl md:text-6xl font-semibold text-white animate-slideUp`}>
          El <span className="text-amber-500">Blog Estratégico</span> de Tu Marca
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          No son solo artículos. Son <strong>guías prácticas</strong> para construir una marca que destaque, 
          conecte y crezca con propósito. Ideal para emprendedores, coaches y pequeñas empresas.
        </p>
      </div>

      {/* Sección de valor */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-md border border-white/10">
          <PenTool className="mx-auto mb-4 text-amber-500" size={32} />
          <h3 className="text-white font-semibold text-lg mb-2">Branding Auténtico</h3>
          <p className="text-gray-400 text-sm">Define tu esencia, voz y propuesta de valor única.</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-md border border-white/10">
          <Zap className="mx-auto mb-4 text-amber-500" size={32} />
          <h3 className="text-white font-semibold text-lg mb-2">Diseño que Convierte</h3>
          <p className="text-gray-400 text-sm">Sitios estéticos, rápidos y orientados a resultados.</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-md border border-white/10">
          <Target className="mx-auto mb-4 text-amber-500" size={32} />
          <h3 className="text-white font-semibold text-lg mb-2">Marketing con Sentido</h3>
          <p className="text-gray-400 text-sm">Estrategias que generan tráfico, engagement y ventas.</p>
        </div>
      </div>

      {/* Posts */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <article className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-102">
              <div className="relative w-full h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 bg-amber-500/90 text-black text-xs font-bold px-3 py-1 rounded-full">
                    {getIcon(post.category)}
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className={`${playfair.className} text-xl font-semibold text-white group-hover:text-amber-400 transition-colors`}>
                  {post.title}
                </h2>
                <p className="mt-3 text-gray-300 text-sm leading-relaxed">{post.excerpt}</p>
                <p className="mt-4 text-amber-500 text-xs font-medium">🕒 {post.readTime} de lectura</p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-24 text-center max-w-2xl mx-auto bg-gradient-to-r from-gray-900 to-transparent border border-gray-700 rounded-2xl p-8">
        <h3 className="text-white text-2xl font-semibold mb-4">¿Querés más contenido como este?</h3>
        <p className="text-gray-400 mb-6">Suscríbete y recibí cada semana:</p>
        <ul className="text-gray-300 text-sm space-y-2 mb-6 text-left max-w-xs mx-auto">
          <li className="flex items-center gap-2">✍️ Tips de branding aplicables</li>
          <li className="flex items-center gap-2">🚀 Estrategias de lanzamiento</li>
          <li className="flex items-center gap-2">🔍 Análisis de marcas reales</li>
        </ul>
        <Link href="/newsletter" className="inline-block px-8 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition">
          🔔 Suscribirme al newsletter
        </Link>
      </div>
    </section>
  );
}

// Función auxiliar para mostrar ícono según categoría
function getIcon(category: string) {
  switch (category) {
    case 'Branding Estratégico':
      return <PenTool size={16} />;
    case 'Diseño Web':
      return <Zap size={16} />;
    case 'Marketing Digital':
      return <Target size={16} />;
    default:
      return <BookOpen size={16} />;
  }
}