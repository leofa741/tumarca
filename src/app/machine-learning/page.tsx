import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios de Machine Learning para Retail | TuMarca",
  description:
    "Optimice su negocio minorista con machine learning: predicción de demanda, personalización de experiencias, precios dinámicos y detección de fraudes. Convierta datos en resultados.",
};

export default function MLRetailServicePage() {
  return (
    <main className="container mx-auto px-6 py-20 md:py-28 lg:py-32">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-200 dark:text-white leading-tight mb-6">
          Machine Learning para Retail: Convierta Datos en Resultados
        </h1>
        <p className="text-lg md:text-xl text-gray-100 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Le ayudamos a implementar <strong>inteligencia artificial en su negocio minorista</strong> para vender más, reducir costos y fidelizar clientes.
        </p>
        <a
          href="/contact"
          className="px-8 py-4 rounded-xl text-lg font-semibold shadow-lg 
                     bg-gradient-to-r from-blue-600 to-teal-500 text-white 
                     hover:from-blue-700 hover:to-teal-600 
                     dark:from-blue-500 dark:to-teal-400 dark:hover:from-blue-600 dark:hover:to-teal-500
                     transition-all duration-300 transform hover:scale-105"
        >
          📊 Solicitar Consulta Gratuita
        </a>
      </section>

      {/* STORYTELLING EMOCIONAL — PSICOLOGÍA DEL DESEO */}
      <section className="max-w-4xl mx-auto px-6 py-16 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-black rounded-3xl text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Imagina esto...</h2>
        <p className="text-lg mb-8 leading-relaxed">
          Sabes <strong>exactamente qué producto se agotará mañana</strong> — y ya lo repones hoy.<br />
          Cada cliente recibe <strong>ofertas personalizadas que realmente le interesan</strong> — y compra más.<br />
          Tus precios se ajustan solos para maximizar ganancias — <strong>sin perder competitividad</strong>.<br />
          Y tú... tomas decisiones con total confianza, <strong>respaldado por datos, no por intuición</strong>.
        </p>
        <p className="italic text-gray-300">
          Eso no es ciencia ficción. Es lo que logran nuestros clientes cada día.
        </p>
      </section>

      {/* Beneficios */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-200 dark:text-white text-center mb-12">
          ¿Qué logrará su negocio con Machine Learning?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
              📈 Predicción precisa de la demanda
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Reduzca quiebres de stock y exceso de inventario anticipando qué productos se venderán, en qué momento y en qué cantidad.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
              → Reducción promedio de stock muerto: 35%
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
              🎯 Experiencias personalizadas
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Ofrezca recomendaciones inteligentes en tienda y online para aumentar la fidelización y el valor promedio del ticket.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
              → Incremento promedio en ventas cruzadas: 28%
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-400 mb-4">
              💰 Optimización de precios dinámicos
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Ajuste precios en tiempo real según demanda, competencia e inventario, maximizando rentabilidad sin perder competitividad.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
              → Aumento promedio en margen bruto: 12-18%
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-4">
              🧩 Detección de productos con baja rotación
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Identifique productos con bajo rendimiento y ajuste su estrategia de marketing y ventas para impulsarlos.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
              → Recuperación promedio de productos estancados: 41%
            </p>
          </div>
        </div>
      </section>

      {/* ERRORES COMUNES — PSICOLOGÍA DEL DOLOR */}
      <section className="max-w-5xl mx-auto px-6 py-16 bg-red-50 dark:bg-red-900/10 rounded-3xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          ❌ Lo que la mayoría hace mal (y tú puedes evitar)
        </h2>
        <div className="grid md:grid-cols-2 gap-8 text-gray-700 dark:text-gray-300">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">💡 Comprar herramientas sin estrategia</h4>
            <p>Plataformas caras que nadie usa o que no se integran con sus datos reales. Terminan como “elefantes blancos” tecnológicos.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">💡 Confundir datos con inteligencia</h4>
            <p>Tener dashboards no significa tener insights accionables. Nosotros convertimos datos en decisiones concretas.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">💡 Ignorar la cultura de datos en la empresa</h4>
            <p>El ML fracasa si el equipo no entiende cómo usarlo. Nosotros capacitamos y acompañamos en la adopción real.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">💡 No medir el ROI del proyecto</h4>
            <p>Si no sabes cuánto te está generando, no sabes si vale la pena. Nosotros definimos KPIs claros desde el día 1.</p>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-200 dark:text-white text-center mb-12">
          Nuestro proceso de implementación (Sin sorpresas)
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg mb-4">1</div>
            <h4 className="font-bold text-lg mb-2">Diagnóstico</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Analizamos sus datos, sistemas y objetivos de negocio.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg mb-4">2</div>
            <h4 className="font-bold text-lg mb-2">Estrategia</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Diseñamos una arquitectura de datos unificada y clara.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg mb-4">3</div>
            <h4 className="font-bold text-lg mb-2">Modelos ML</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Implementamos algoritmos adaptados a su negocio minorista.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg mb-4">4</div>
            <h4 className="font-bold text-lg mb-2">Capacitación</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Formamos a su equipo para aprovechar la nueva ventaja competitiva.</p>
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL + TESTIMONIO CON MÉTRICAS */}
      <section className="max-w-5xl mx-auto px-6 py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-md mt-12 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            ¿Por qué Retailers como tú ya están usando nuestro ML?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Porque no vendemos algoritmos. Vendemos <strong>resultados tangibles</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <span className="text-2xl text-blue-500">📊</span>
                <div>
                  <strong className="text-gray-900 dark:text-white">Modelos entrenados con tus datos reales</strong>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    No usamos plantillas genéricas. Todo se adapta a tu inventario, clientes y canales.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl text-purple-500">🧠</span>
                <div>
                  <strong className="text-gray-900 dark:text-white">Explicabilidad y control total</strong>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    Sabrás por qué el sistema recomienda algo. Sin “cajas negras”.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl text-green-500">📈</span>
                <div>
                  <strong className="text-gray-900 dark:text-white">ROI medido mes a mes</strong>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    Te mostramos cuánto estás ganando (o ahorrando) gracias a cada modelo implementado.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl text-sm text-gray-700 dark:text-gray-300 italic">
            <blockquote>
              &quot;Gracias al modelo de predicción de demanda, redujimos nuestro exceso de inventario en un 42% y aumentamos la disponibilidad de productos clave en un 31%. El ROI fue positivo en solo 8 semanas.&quot;
              <footer className="mt-4 font-medium text-gray-900 dark:text-white">
                — Carlos Ríos, Gerente de Operaciones en ModaRetail S.A.
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* GARANTÍA PSICOLÓGICA — REDUCE RIESGO */}
      <section className="max-w-4xl mx-auto px-6 py-16 bg-green-50 dark:bg-green-900/10 rounded-3xl text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">✅ Tu inversión está protegida</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Si en los primeros 60 días no ves mejoras medibles en los KPIs acordados, ajustamos el modelo sin costo adicional.
          <strong className="block mt-2">Sin excusas. Sin riesgo.</strong>
        </p>
      </section>

      {/* CTA Final con urgencia suave */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-200 dark:text-white mb-6">
          ¿Quiere liderar el futuro del retail con Machine Learning?
        </h2>
        <p className="text-lg text-gray-100 dark:text-gray-300 mb-10">
          Hable con nuestros expertos y descubra cómo podemos transformar su negocio con datos inteligentes.
        </p>
        <a
          href="/contact"
          className="px-10 py-5 rounded-xl text-xl font-semibold shadow-lg 
                     bg-gradient-to-r from-blue-600 to-teal-500 text-white 
                     hover:from-blue-700 hover:to-teal-600 
                     dark:from-blue-500 dark:to-teal-400 dark:hover:from-blue-600 dark:hover:to-teal-500
                     transition-all duration-300 transform hover:scale-105"
        >
          🚀 Solicitar Consulta Gratuita
        </a>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Sin compromiso. Evaluamos su situación actual y le proponemos un plan a medida. <strong>Cupos limitados esta semana.</strong>
        </p>
      </section>
    </main>
  );
}