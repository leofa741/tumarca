import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machine Learning para Negocios | Transforme Datos en Ventaja Competitiva",
  description:
    "Implemente soluciones de ciencia de datos en su empresa: predicción de demanda, optimización de operaciones, personalización y toma de decisiones basada en evidencia. Para PYMEs y grandes empresas.",
};

export default function MLForBusinessPage() {
  return (
    <main className="container mx-auto px-6 py-20 md:py-28 lg:py-32">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-200 dark:text-white leading-tight mb-6">
          Machine Learning para Negocios Reales: Decida con Datos, No con Corazonadas
        </h1>
        <p className="text-lg md:text-xl text-gray-100 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Ayudamos a <strong>PYMEs y empresas de cualquier sector</strong> a implementar inteligencia artificial que reduzca costos, aumente ventas y mejore la eficiencia operativa — sin tecnicismos innecesarios.
        </p>
        <a
          href="/contact"
          className="px-8 py-4 rounded-xl text-lg font-semibold shadow-lg 
                     bg-gradient-to-r from-blue-600 to-teal-500 text-white 
                     hover:from-blue-700 hover:to-teal-600 
                     dark:from-blue-500 dark:to-teal-400 dark:hover:from-blue-600 dark:hover:to-teal-500
                     transition-all duration-300 transform hover:scale-105"
        >
          📊 Solicitar Análisis
        </a>
      </section>

      {/* STORYTELLING EMOCIONAL — PSICOLOGÍA DEL DESEO */}
      <section className="max-w-4xl mx-auto px-6 py-16 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-black rounded-3xl text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Imagina esto...</h2>
        <p className="text-lg mb-8 leading-relaxed">
          Sabes <strong>cuándo un cliente está a punto de irse</strong> — y actúas antes.<br />
          <strong>Optimizas tus rutas de entrega</strong> y reduces costos logísticos semana a semana.<br />
          Tus equipos saben <strong>qué hacer, cuándo y por qué</strong> — porque los datos les dicen cómo.<br />
          Y tú... lideras con claridad, porque <strong>cada decisión está respaldada por evidencia</strong>.
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
              📈 Previsión inteligente de operaciones
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Anticipe necesidades de inventario, recursos humanos, mantenimiento o ventas — en cualquier industria.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
              → Reducción promedio de costos operativos: 20–35%
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
              👥 Comprensión profunda del cliente
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Identifique patrones de comportamiento, riesgo de abandono y oportunidades de upsell — incluso en B2B.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
              → Retención mejorada en un 25% en clientes clave
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-400 mb-4">
              ⚙️ Optimización de recursos y costos
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Desde rutas logísticas hasta asignación de turnos o uso de energía: maximice eficiencia con modelos predictivos.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
              → Ahorro promedio en logística: 18%
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-4">
              🚨 Alertas inteligentes y toma de decisiones proactiva
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Reciba avisos automáticos sobre desviaciones, fraudes operativos o caídas en rendimiento antes de que se conviertan en crisis.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
              → Tiempo de respuesta a incidentes: -60%
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
            <h4 className="font-bold text-lg mb-2">Modelos ML a medida</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Desarrollamos algoritmos específicos para <strong>su industria, datos y objetivos</strong> — no usamos "cajas negras".
            </p>
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
            ¿Por qué empresas como tú ya están usando nuestro ML?
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
                    No usamos plantillas genéricas. Todo se adapta a tu operación, clientes y canales.
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
              &quot;Implementamos el sistema de alertas predictivas en nuestra operación logística y redujimos un 37% los retrasos en entregas. El modelo se entrena semanalmente con nuestros datos reales.&quot;
              <footer className="mt-4 font-medium text-gray-900 dark:text-white">
                — Martina L., Directora de Operaciones, Distribuidora Andina S.A.
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ¿CÓMO SE USA EN LA VIDA REAL? — Plataforma web unificada */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-900/30 to-teal-900/20 dark:from-blue-900/50 dark:to-teal-900/40 rounded-3xl p-8 md:p-10 border border-blue-800/30">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            ¿Cómo se ve un modelo de ML a medida en su día a día?
          </h2>
          <p className="text-gray-200 dark:text-gray-300 text-lg text-center mb-10 max-w-3xl mx-auto">
            Todo se gestiona desde una <strong>plataforma web intuitiva</strong>, accesible desde cualquier dispositivo. Sin instalaciones. Sin tecnicismos. Solo decisiones inteligentes.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-white">
            <div className="bg-gray-800/60 dark:bg-gray-900/70 p-6 rounded-2xl border border-gray-700">
              <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                <span className="text-blue-400">🖥️</span> Dashboards explicables
              </h3>
              <p className="text-gray-300 leading-relaxed">
                No son solo gráficos bonitos. Cada recomendación incluye:
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li><strong>Qué hacer</strong> (ej.: “Reponer 45 unidades del SKU-882”)</li>
                  <li><strong>Por qué</strong> (ej.: “Demanda esperada +72% por feriado local”)</li>
                  <li><strong>Impacto estimado</strong> (ej.: “+18% en ventas si actúas hoy”)</li>
                </ul>
                Todo en una interfaz limpia, en español, y adaptada a su rol (ventas, logística, gerencia, etc.).
              </p>
            </div>

            <div className="bg-gray-800/60 dark:bg-gray-900/70 p-6 rounded-2xl border border-gray-700">
              <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                <span className="text-green-400">🔔</span> Alertas inteligentes por correo o WhatsApp
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Cuando algo requiere acción inmediata, <strong>usted recibe una notificación directa</strong>:
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>“Cliente X está en riesgo de abandono → enviar oferta ahora”</li>
                  <li>“Ruta de entrega ineficiente → ahorraría 2.1 horas con ajuste”</li>
                  <li>“Inventario crítico en sucursal 3 → reponer antes de las 10 AM”</li>
                </ul>
                Configura qué alertas recibir, cómo (email, WhatsApp Business) y a quién notificar.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center text-gray-300 italic">
            <p className="text-lg">
              <strong>Nada se queda en “la nube técnica”.</strong> Todo está diseñado para que su equipo <em>actúe</em>, no solo para que mire datos.
            </p>
          </div>
        </div>
      </section>

      {/* ¿Para qué tipo de empresas? */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-200 dark:text-white text-center mb-8">
          Este enfoque funciona para:
        </h2>
        <div className="flex flex-wrap justify-center gap-4 text-gray-300 dark:text-gray-400">
          {[
            "Retail y e-commerce",
            "Logística y transporte",
            "Manufactura",
            "Servicios financieros",
            "Salud y farmacias",
            "Agronegocios",
            "Energía y utilities",
            "PYMEs con operaciones repetitivas",
          ].map((sector) => (
            <span
              key={sector}
              className="px-4 py-2 bg-gray-800/50 dark:bg-gray-900/60 rounded-full text-sm"
            >
              {sector}
            </span>
          ))}
        </div>
      </section>

      {/* GARANTÍA PSICOLÓGICA — REDUCE RIESGO */}
      <section className="max-w-4xl mx-auto px-6 py-16 bg-green-50 dark:bg-green-900/10 rounded-3xl text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ✅ Tu inversión está protegida
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Si en los primeros 60 días no ves mejoras medibles en los KPIs acordados, ajustamos el modelo sin costo adicional.
          <strong className="block mt-2">Sin excusas. Sin riesgo.</strong>
        </p>
      </section>

      {/* CTA Final con urgencia suave */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-200 dark:text-white mb-6">
          ¿Su negocio genera datos? Entonces puede transformarse con Machine Learning.
        </h2>
        <p className="text-lg text-gray-100 dark:text-gray-300 mb-10">
          Trabajamos con empresas desde 10 hasta 10,000 empleados. Si tiene operaciones, clientes o inventario, tenemos una solución basada en datos para usted.
        </p>
        <a
          href="/contact"
          className="px-10 py-5 rounded-xl text-xl font-semibold shadow-lg 
                     bg-gradient-to-r from-blue-600 to-teal-500 text-white 
                     hover:from-blue-700 hover:to-teal-600 
                     dark:from-blue-500 dark:to-teal-400 dark:hover:from-blue-600 dark:hover:to-teal-500
                     transition-all duration-300 transform hover:scale-105"
        >
          🚀 Solicitar Análisis
        </a>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Sin compromiso. Evaluamos su situación actual y le proponemos un plan a medida. <strong>Cupos limitados esta semana.</strong>
        </p>
      </section>

      {/* Pie técnico (credibilidad sutil) */}
      <div className="max-w-4xl mx-auto text-center text-xs text-gray-500 dark:text-gray-600 mt-12 pt-6 border-t border-gray-800">
        Tecnologías utilizadas: Python, scikit-learn, XGBoost, Prophet, SQL, Airflow, Docker. Modelos explicables con SHAP/LIME.
        Integración nativa con ERP, CRM y bases de datos existentes.
      </div>
    </main>
  );
}