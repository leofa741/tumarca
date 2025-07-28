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
];

export default posts;