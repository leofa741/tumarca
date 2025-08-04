// lib/posts.ts

export interface Post {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string; // Aquí va todo el artículo
  slug: string;
  image: string;
  readTime: string;
  publishedAt: string;
};

const posts: Post[] = [
 {
  id: 1,
  title: "Cómo aparecer en Google: Guía paso a paso para indexar tu web y mejorar el SEO",
  category: "SEO y Posicionamiento",
  excerpt: "¿Tu web no aparece en Google? Tranquilo, no estás solo. En esta guía te explicamos cómo lograr que tu sitio esté visible en los resultados de búsqueda y cómo optimizarlo para subir posiciones.",
  content: `
    <p>Si tenés una web y no aparece en Google, es como si no existiera. Pero la buena noticia es que podés cambiarlo. Acá te contamos cómo hacer que Google detecte, indexe y muestre tu sitio web.</p>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">1. Verificá tu sitio con Google Search Console</h2>
    <p>Ingresá a <a href="https://search.google.com/search-console/about" target="_blank" class="underline text-blue-400">Search Console</a> y agregá tu dominio. Verificá la propiedad con un registro DNS o HTML. Esto le dice a Google que el sitio es tuyo.</p>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">2. Enviá tu sitemap</h2>
    <p>Un sitemap es un archivo que le indica a Google cómo está estructurada tu web. Si usás Vercel con Next.js, podés generarlo automáticamente con plugins o librerías. Luego, en Search Console, enviá la ruta: <code>/sitemap.xml</code>.</p>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">3. Optimizá tu sitio con SEO básico</h2>
    <ul class="list-disc list-inside">
      <li>Usá títulos claros (<code>&lt;title&gt;</code> y <code>meta description</code>).</li>
      <li>Incluí palabras clave reales en tus textos.</li>
      <li>Asegurate de que la web cargue rápido y esté adaptada a móvil.</li>
    </ul>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">4. Creá contenido útil</h2>
    <p>Publicar artículos como este que estás leyendo ayuda a que Google entienda que tu web es activa y valiosa. Es una de las formas más efectivas de mejorar tu posicionamiento.</p>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">5. Usá Google Analytics para medir resultados</h2>
    <p>Con Google Analytics podés ver cuántas personas te visitan, desde dónde, cuánto tiempo están, y qué contenido funciona mejor. Eso te da información real para tomar decisiones.</p>

    <p>¿Querés que te ayudemos a mejorar tu posicionamiento y visibilidad online? Contactanos desde nuestra web y crecemos juntos.</p>
  `,
  slug: "como-aparecer-en-google",
  image: "/como-aparecer-en-google.png",
  readTime: "6 min",
  publishedAt: "2025-08-04",
},
  {
    id: 2,
    title: "Tendencias de diseño web 2025 que ya están funcionando",
    category: "Diseño Web",
    excerpt: "Sitios más rápidos, experiencias más humanas y tecnologías que convierten.",
    content: `
      <p>El diseño web está evolucionando rápido. Ya no basta con que se vea bonito: debe <strong>convertir, cargar rápido y sentirse humano</strong>.</p>

      <h2 class="text-2xl font-semibold text-white mt-6 mb-4">1. Micro-interacciones con propósito</h2>
      <p>Pequeñas animaciones que guían al usuario: un botón que cambia al hacer hover, un mensaje de agradecimiento después de un formulario. Hacen la experiencia más agradable.</p>

      <h2 class="text-2xl font-semibold text-white mt-6 mb-4">2. Tipografías grandes y audaces</h2>
      <p>El texto como protagonista. Más legibilidad, más impacto visual. Ideal para páginas de lanzamiento o portfolios.</p>

      <h2 class="text-2xl font-semibold text-white mt-6 mb-4">3. Fondos oscuros con alto contraste</h2>
      <p>Moderno, elegante y fácil de leer si se hace bien. Usalo con tipografía clara y toques de color estratégicos.</p>

      <p>El futuro del diseño web es <strong>rápido, emocional y centrado en el usuario</strong>. ¿Estás listo?</p>
    `,
    slug: "tendencias-diseno-web-2025",
    image: "/desarrollo-web.png",
    readTime: "6 min",
    publishedAt: "2025-04-03",
  },
  {
    id: 3,
    title: "El poder del marketing emocional (y cómo aplicarlo)",
    category: "Marketing Digital",
    excerpt: "Las emociones venden más que los features. Te mostramos cómo conectar profundamente.",
    content: `
      <p>Las personas toman decisiones por emoción y las justifican con lógica. Eso es lo que hace poderoso al <strong>marketing emocional</strong>.</p>

      <h2 class="text-2xl font-semibold text-white mt-6 mb-4">1. Identificá el dolor de tu cliente</h2>
      <p>No vendés un servicio: vendés alivio, tranquilidad, orgullo, pertenencia. ¿Qué siente tu cliente antes y después de usar tu producto?</p>

      <h2 class="text-2xl font-semibold text-white mt-6 mb-4">2. Contá historias reales</h2>
      <p>Los testimonios, los casos de éxito y tus propias vivencias generan conexión. La gente confía en historias, no en promesas.</p>

      <h2 class="text-2xl font-semibold text-white mt-6 mb-4">3. Usá un lenguaje que hable al corazón</h2>
      <p>Evitá jerga técnica. Hablá como hablarías a un amigo. Frases como “¿Cansado de no ser visto?” o “Imaginate por fin teniendo clientes que te valoren” funcionan.</p>

      <p>El marketing emocional no es manipulación: es empatía. Y es la clave para marcas que perduran.</p>
    `,
    slug: "marketing-emocional",
    image: "/El-poder-del-marketing-emocional.png",
    readTime: "7 min",
    publishedAt: "2025-04-01",
  },
  {
  id: 4,
  title: "¿Por qué tu sitio necesita un blog? (Y cómo puede impulsar tu marca)",
  category: "Estrategia Digital",
  excerpt: "Un blog activo no es solo texto: es visibilidad, confianza y crecimiento a largo plazo.",
  content: `
    <p>Un sitio web con blog es como una vidriera viva. No solo mostrás lo que hacés: construís autoridad, atraés tráfico y generás confianza.</p>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">1. Atrae visitas con SEO orgánico</h2>
    <p>Los artículos bien escritos posicionan en Google. Cada post es una oportunidad para que nuevos clientes te encuentren buscando lo que ofrecés.</p>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">2. Te posiciona como referente</h2>
    <p>Compartir conocimiento muestra que sabés lo que hacés. Tus futuros clientes quieren trabajar con alguien que entiende y educa.</p>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">3. Genera confianza y conexión</h2>
    <p>Un blog con tono humano, claro y útil genera cercanía. Sentís que hay una persona detrás de la marca, y eso hace toda la diferencia.</p>

    <p>No se trata de escribir por escribir: se trata de crear contenido que resuelva, inspire y posicione. Si no tenés un blog, estás dejando valor sobre la mesa.</p>
  `,
  slug: "importancia-del-blog",
  image: "/importancia-del-blog-en-tu-sitio.png",
  readTime: "6 min",
  publishedAt: "2025-08-01",
},
{
  id: 5,
  title: "¿Por qué tu web no vende? (Y cómo podés cambiarlo)",
  category: "Estrategia Digital",
  excerpt: "Si tu sitio no convierte visitas en clientes, hay algo que no está funcionando. Descubrí las causas más comunes y cómo solucionarlas.",
  content: `
    <p>Tu web puede ser tu mejor aliada o tu mayor obstáculo. Muchos negocios tienen presencia online, pero no resultados. ¿Te pasa que tenés visitas, pero nadie compra, consulta ni deja sus datos?</p>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">1. No generás confianza</h2>
    <p>Una web lenta, desactualizada o mal diseñada transmite desconfianza. Si el usuario no siente seguridad en los primeros segundos, se va. Y no vuelve.</p>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">2. No hay un mensaje claro</h2>
    <p>¿Qué hacés? ¿Para quién? ¿Por qué deberían elegirte? Si no lo explicás en los primeros segundos, el visitante se pierde y abandona.</p>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">3. No está optimizada para vender</h2>
    <p>Una web funcional debe guiar al usuario hacia la acción: pedir un presupuesto, comprar, agendar, etc. Sin llamadas a la acción claras, no hay conversiones.</p>

    <h2 class="text-2xl font-semibold text-white mt-6 mb-4">4. No estás trabajando el SEO</h2>
    <p>Si no aparecés en Google, nadie te encuentra. Sin contenido optimizado ni estrategia de palabras clave, tu sitio queda invisible para quien más te necesita.</p>

    <p>No se trata solo de tener una web: se trata de tener una web que cumpla un objetivo claro. Analizá tu sitio con mirada crítica o escribinos. Te ayudamos a transformarlo en una herramienta real de venta.</p>
  `,
  slug: "por-que-tu-web-no-vende",
  image: "/por-que-tu-web-no-vende.png",
  readTime: "5 min",
  publishedAt: "2025-08-02",
},
 {
    id: 6,
    title: "Cómo construir una marca memorable (sin ser genérico)",
    category: "Branding Estratégico",
    excerpt: "Descubrí los 5 pilares que usan las marcas que todos recuerdan.",
    content: `
      <p>Construir una marca memorable no se trata solo de tener un logo bonito o un nombre creativo. Se trata de <strong>coherencia, propósito y conexión emocional</strong>.</p>

      <h2 class="text-2xl font-semibold text-white mt-6 mb-4">1. Define tu "por qué"</h2>
      <p>Según Simon Sinek, las marcas que inspiran comienzan con el por qué. ¿Por qué existes más allá de ganar dinero? Esto atrae a personas que creen lo mismo que vos.</p>

      <h2 class="text-2xl font-semibold text-white mt-6 mb-4">2. Sé coherente en cada detalle</h2>
      <p>Desde el tono de voz hasta el color del botón de tu sitio: todo debe reflejar tu identidad. La coherencia construye confianza.</p>

      <p>¿Querés un ejemplo? Apple no solo vende tecnología: vende <em>simplicidad, innovación y diseño</em>. Y lo repite en cada punto de contacto.</p>

      <blockquote class="border-l-4 border-amber-500 pl-5 italic text-gray-300 mt-6 mb-6">
        "Las personas no compran lo que hacés, compran por qué lo hacés." – Simon Sinek
      </blockquote>

      <h2 class="text-2xl font-semibold text-white mt-6 mb-4">3. Habla como humano, no como empresa</h2>
      <p>El lenguaje frío y corporativo no conecta. Usá tu voz, tu historia, tu autenticidad. La gente sigue a personas, no a logos.</p>

      <p>Conclusión: Una marca memorable no se construye en un día, pero cada decisión cuenta. Empezá por tu esencia, y todo lo demás fluirá.</p>
    `,
    slug: "branding-memorable",
    image: "/Como-construir-una-marca-memorable.png",
    readTime: "5 min",
    publishedAt: "2025-04-05",
  }


];

export default posts;