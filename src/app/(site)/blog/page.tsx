import Image from 'next/image';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { BookOpen, PenTool, Zap, Target, ArrowRight, Clock, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import posts from '@/lib/posts';
import NewsletterCTA from '@/components/NewsletterCTA';
import AplicacionesAMedida from '@/components/AplicacionesAMedida';
import ServicioSEO from '@/components/ServicioSEO';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Blog de Branding y Marketing Digital | Tu Marca AR',
  description:
    'Aprende a construir una marca poderosa, diseñar sitios web que convierten y crecer con estrategia. Tips reales para emprendedores y pequeñas empresas.',
  openGraph: {
    title: 'Blog | Tu Marca AR - Estrategia de Marca y Crecimiento Digital',
    description:
      'Guías prácticas sobre branding, diseño web, marketing emocional y lanzamientos exitosos. Transforma tu negocio desde la esencia.',
    images: [
      {
        url: 'https://www.tumarca.ar/marca-2-ar.png',
        width: 800,
        height: 600,
        alt: 'Tu Marca AR - Blog de Estrategia de Marca',
      },
    ],
  },
};

function getIcon(category: string) {
  switch (category) {
    case 'Branding Estratégico': return <PenTool size={14} />;
    case 'Diseño Web': return <Zap size={14} />;
    case 'Marketing Digital': return <Target size={14} />;
    default: return <BookOpen size={14} />;
  }
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Effects Premium */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <main className="relative z-10 container mx-auto px-6 py-16 md:py-24 lg:py-32">
        
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-purple-600 rounded-2xl mx-auto mb-6 shadow-lg shadow-amber-500/25">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight`}>
            El <span className="bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">Blog Estratégico</span> de Tu Marca
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            No son solo artículos. Son <strong className="text-white">guías prácticas</strong> para construir una marca que destaque, conecte y crezca con propósito.
          </p>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: <PenTool className="w-6 h-6" />, title: 'Branding Auténtico', desc: 'Define tu esencia, voz y propuesta de valor única.' },
            { icon: <Zap className="w-6 h-6" />, title: 'Diseño que Convierte', desc: 'Sitios estéticos, rápidos y orientados a resultados.' },
            { icon: <Target className="w-6 h-6" />, title: 'Marketing con Sentido', desc: 'Estrategias que generan tráfico, engagement y ventas.' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="group relative bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 p-8 text-center h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-purple-500/10 px-4 py-1.5 rounded-full text-sm font-medium text-amber-400 border border-amber-500/20 mb-6">
            <Sparkles className="w-4 h-4" />
            Últimas Publicaciones
          </span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent`}>
            Conocimiento que transforma negocios
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            Explora nuestras guías más recientes sobre diseño, estrategia y crecimiento digital.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
              <article className="group relative h-full bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative z-10 w-full h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full">
                      {getIcon(post.category)}
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="relative z-10 p-6 flex flex-col flex-grow">
                  <h2 className={`${playfair.className} text-xl font-semibold text-white group-hover:text-amber-400 transition-colors mb-3`}>
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <span className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-300">
                      Leer más <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Bottom Sections */}
        <div className="mt-32 space-y-24">
          <NewsletterCTA />
          <ServicioSEO />
          <AplicacionesAMedida />
        </div>
      </main>
    </div>
  );
}