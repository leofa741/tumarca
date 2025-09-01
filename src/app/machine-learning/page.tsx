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

      {/* Beneficios */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-200 dark:text-white text-center mb-12">
          ¿Qué logrará su negocio con Machine Learning?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
              Predicción precisa de la demanda
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Reduzca quiebres de stock y exceso de inventario anticipando qué productos se venderán, en qué momento y en qué cantidad.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
              Experiencias personalizadas
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Ofrezca recomendaciones inteligentes en tienda y online para aumentar la fidelización y el valor promedio del ticket.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-400 mb-4">
              Optimización de precios dinámicos
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Ajuste precios en tiempo real según demanda, competencia e inventario, maximizando rentabilidad sin perder competitividad.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-4">
              Detección de fraude y anomalías
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Identifique patrones sospechosos en devoluciones, pagos y operaciones internas antes de que se traduzcan en pérdidas.
            </p>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-200 dark:text-white text-center mb-12">
          Nuestro proceso de implementación
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h4 className="font-bold text-lg mb-2">1. Diagnóstico</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Analizamos sus datos, sistemas y objetivos de negocio.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h4 className="font-bold text-lg mb-2">2. Estrategia</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Diseñamos una arquitectura de datos unificada y clara.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h4 className="font-bold text-lg mb-2">3. Modelos ML</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Implementamos algoritmos adaptados a su negocio minorista.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h4 className="font-bold text-lg mb-2">4. Capacitación</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Formamos a su equipo para aprovechar la nueva ventaja competitiva.</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
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
          Sin compromiso. Evaluamos su situación actual y le proponemos un plan a medida.
        </p>
      </section>
    </main>
  );
}
