// components/AplicacionesIA.tsx
import { Sparkles, MessageSquare, Mic, BookOpen, Globe, Brain } from 'lucide-react';
import CorrectorTextoIA from './AsistenteIA';

export default function AplicacionesIA() {
  return (
    <>
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900/40 via-transparent to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto principal */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Sparkles className="text-amber-500" size={28} />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Aplicaciones de IA a tu Medida
                </h2>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                No solo usamos IA. <strong>La construimos para tu negocio</strong>. Desde chatbots inteligentes hasta herramientas de voz y traducción automática, desarrollamos aplicaciones con inteligencia artificial que resuelven problemas reales.
              </p>

              <p className="text-gray-400 mb-8">
                Imagina un asistente que entiende a tus clientes, responde en tu nombre, traduce conversaciones en tiempo real o convierte audios en textos listos para compartir. <strong>Ya no es el futuro: lo hacemos hoy</strong>.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MessageSquare className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="text-white font-semibold">Chatbots estilo ChatGPT Empresarial</h3>
                    <p className="text-gray-400 text-sm">
                      Asistentes personalizados con tu tono, conocimiento y flujos de trabajo. Ideales para atención al cliente, ventas o capacitación interna.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mic className="text-green-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="text-white font-semibold">Voz a Texto & Texto a Voz</h3>
                    <p className="text-gray-400 text-sm">
                      Grabá un audio y convertilo en texto automáticamente. O escribí un mensaje y escuchalo en voz alta, en español, inglés o hasta 20 idiomas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="text-white font-semibold">Generador de Conversaciones</h3>
                    <p className="text-gray-400 text-sm">
                      Simulá diálogos reales para entrenamiento, guiones, pruebas de producto o contenido educativo. Controlá el tema, tono e idioma.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="text-white font-semibold">Multilingüe y adaptable</h3>
                    <p className="text-gray-400 text-sm">
                      Ideal para empresas internacionales, escuelas de idiomas o servicios globales. Traducción contextual, no literal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-5">
                <p className="text-blue-200 italic text-sm">
                  “La IA no reemplaza a las personas. Libera a tu equipo de tareas repetitivas para que se enfoquen en lo que realmente importa.”
                </p>
              </div>
            </div>

            {/* Panel de ejemplo de IA en acción */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 shadow-xl">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center">
                <Brain className="text-amber-500 mr-2" size={24} />
                Ejemplo: Asistente IA para Coaching
              </h3>
              <div className="space-y-4 text-sm">
                <div className="bg-gray-900/70 p-3 rounded-lg border-l-4 border-amber-500">
                  <p className="text-amber-200 font-medium">Usuario:</p>
                  <p className="text-gray-300">"Necesito un mensaje para retener a un cliente indeciso."</p>
                </div>
                <div className="bg-blue-900/40 p-3 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-200 font-medium">IA (tu tono):</p>
                  <p className="text-gray-200 text-xs">
                    "Hola [Nombre], sé que estás evaluando tus opciones. Quiero recordarte que este proceso no es solo sobre resultados, sino sobre transformación. Estoy aquí para acompañarte, sin presión, sin jerga. ¿Hablamos 5 minutos?"
                  </p>
                </div>
                <div className="text-gray-500 text-xs mt-2">
                  Respuesta generada por un modelo entrenado con tu estilo de comunicación.
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
                <p className="text-green-300 text-sm">
                  ✅ Entrenado con tus textos, ✅ sin salir de tu marca, ✅ integrado a tu web o app
                </p>
              </div>
            </div>
          </div>
           {/*<CorrectorTextoIA />*/}
          {/* CTA especial para IA */}
          <div className="text-center mt-16">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              💬 Quiero mi asistente de IA personalizado
            </a>
            <p className="text-gray-500 text-sm mt-3">
              ¿Tenés una idea? Hablemos y la hacemos realidad.
            </p>
          </div>
        </div>
      </section>

    </>
  );
}