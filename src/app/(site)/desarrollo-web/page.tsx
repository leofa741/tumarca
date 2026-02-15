import { Metadata } from "next";
import VisitTracker from '@/app/(marketing)/components/VisitTracker';

export const metadata: Metadata = {
    title: "Desarrollo Web Empresarial | TuMarca",
    description: "Soluciones web a medida para empresas que buscan escalar: sitios, e-commerce y aplicaciones con alto rendimiento, SEO y seguridad. Hecho para crecer.",
};

export default function DesarrolloWebPage() {
    return (
        <>
            <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
                <VisitTracker
                pageName="desarrollo-web"
              />
                <h1 className="text-4xl md:text-6xl font-bold text-gray-200 dark:text-white mb-6 leading-tight">
                    Desarrollo Web que Impulsa tu Negocio
                </h1>
                <p className="text-lg md:text-xl text-gray-100 dark:text-gray-300 max-w-3xl mx-auto mb-10">
                    No construimos solo sitios web. Creamos <strong>herramientas digitales estratégicas</strong> que generan leads, aumentan ventas y fortalecen tu marca.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm md:text-base">
                    <span className="px-6 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                        ⚡ Rendimiento optimizado
                    </span>
                    <span className="px-6 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                        🔒 Seguridad de nivel empresarial
                    </span>
                    <span className="px-6 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                        📈 SEO técnico incluido
                    </span>
                </div>
            </section>

            {/* STORYTELLING EMOCIONAL — PSICOLOGÍA DEL DESEO */}
            <section className="max-w-4xl mx-auto px-6 py-16 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-black rounded-3xl text-white text-center">
                <h2 className="text-3xl font-bold mb-6">Imagina esto...</h2>
                <p className="text-lg mb-8 leading-relaxed">
                    Tu sitio web no solo se ve increíble... <strong>cada visitante se convierte en cliente potencial</strong>.<br />
                    Google te ama y te posiciona en el top 3.<br />
                    Tu equipo gestiona todo sin depender de terceros.<br />
                    Y tú... duermes tranquilo sabiendo que tu inversión digital <strong>está generando ROI mes a mes</strong>.
                </p>
                <p className="italic text-gray-300">
                    Eso no es un sueño. Es lo que entregamos a cada cliente.
                </p>
            </section>

            {/* Servicios Destacados */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-200 dark:text-white text-center mb-12">
                    Lo que Ofrecemos a tu Empresa
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {/* Servicio 1 */}
                    <div className="bg-whitez dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            Sitios Web Corporativos
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Modernos, rápidos y diseñados para transmitir autoridad. Ideal para empresas que necesitan una presencia digital profesional y escalable.
                        </p>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Diseño responsive y accesible
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Carga en menos de 1.5 segundos
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Integración con métodos de pago
                            </li>
                        </ul>
                    </div>

                    {/* Servicio 2 */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            E-commerce a Medida
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Plataformas de venta online seguras, personalizadas y listas para escalar. Con métricas claras y experiencia de compra optimizada.
                        </p>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Pasarelas de pago integradas
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Gestión de inventario y logística
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Optimización de conversión (CRO)
                            </li>
                        </ul>
                    </div>

                    {/* Servicio 3 */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            Aplicaciones Web Personalizadas
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Soluciones digitales únicas para automatizar procesos, mejorar la productividad o lanzar un nuevo producto digital.
                        </p>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Desarrollo full-stack con React, Next.js, Node
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> APIs y bases de datos seguras
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Panel de administración intuitivo
                            </li>
                        </ul>
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
                        <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">💡 Contratar por precio, no por valor</h4>
                        <p>Terminan con sitios lentos, inseguros y que no generan ventas. El ahorro inicial se convierte en pérdida constante.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
                        <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">💡 Ignorar el SEO técnico</h4>
                        <p>El sitio más bonito es invisible si Google no lo indexa bien. Nosotros lo construimos pensando en algoritmos y humanos.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
                        <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">💡 No planificar el crecimiento</h4>
                        <p>El sitio no escala, se rompe con el tráfico o no soporta nuevas funcionalidades. Nosotros construimos para el futuro.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
                        <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">💡 Falta de colaboración constante</h4>
                        <p>Proyectos opacos generan malentendidos. Nosotros trabajamos contigo, no para ti.</p>
                    </div>
                </div>
            </section>

            {/* POR QUÉ ELEGIRNOS */}
            <section className="max-w-5xl mx-auto px-6 py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-md mt-12 mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        ¿Por qué Empresas como la Tuya Confiaron en Nosotros?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                        No solo entregamos código. Entregamos resultados medibles.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-3">
                                <span className="text-2xl text-blue-500">🚀</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Entregas rápidas, sin sacrificar calidad</strong>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                        Promedio de lanzamiento en 4-6 semanas con revisión continua.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl text-purple-500">🔍</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">SEO técnico desde el primer día</strong>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                        Sitios indexables, rápidos y optimizados para posicionarse en Google.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl text-green-500">🤝</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Colaboración constante</strong>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                        Reuniones semanales, acceso al tablero de proyecto y feedback continuo.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl text-sm text-gray-700 dark:text-gray-300 italic">
                        <blockquote>
                            &quot;En 3 meses, nuestro nuevo e-commerce aumentó un 68% las ventas online. Además, el sitio carga un 70% más rápido que el anterior. Altamente recomendado para proyectos serios.&quot;
                            <footer className="mt-4 font-medium text-gray-900 dark:text-white">
                                — Laura Méndez, Directora de Marketing en Nexora Tech
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* PROCESO TRANSPARENTE — REDUCE ANSIEDAD */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-center text-gray-200 dark:text-white mb-12">
                    Así Trabajamos Contigo (Sin Sorpresas)
                </h2>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg mb-4">1</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Descubrimiento</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Entrevista profunda. Metas, audiencia, competencia.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg mb-4">2</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Diseño & Aprobación</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Wireframes, prototipos interactivos. Tú decides.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg mb-4">3</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Desarrollo & Pruebas</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Construcción ágil. Pruebas de usabilidad y rendimiento.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg mb-4">4</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Lanzamiento & Soporte</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Capacitación, documentación y soporte post-lanzamiento.</p>
                    </div>
                </div>
            </section>

            {/* GARANTÍA PSICOLÓGICA — REDUCE RIESGO */}
            <section className="max-w-4xl mx-auto px-6 py-16 bg-green-50 dark:bg-green-900/10 rounded-3xl text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">✅ Tu inversión está protegida</h2>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Si en los primeros 30 días no estás 100% satisfecho con el resultado, ajustamos hasta que lo estés. 
                    <strong className="block mt-2">Sin costos adicionales. Sin excusas.</strong>
                </p>
            </section>

            {/* CTA FINAL CON URGENCIA SUAVE */}
            <section className="max-w-4xl mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold text-gray-200 dark:text-white mb-6">
                    ¿Listo para Transformar tu Presencia Digital?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                    Agenda una consulta gratuita y te mostramos cómo podemos ayudarte a alcanzar tus objetivos con una solución web estratégica.
                </p>
                <a
                    href="/contact"
                    className="px-8 py-4 rounded-xl text-lg font-semibold shadow-lg 
                     bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                     hover:from-blue-700 hover:to-purple-700 
                     dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600
                     transition-all duration-300 transform hover:scale-105"
                >
                    📞 Solicitar 
                </a>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Sin compromiso. Respuesta en menos de 24 horas. Cupos limitados esta semana.
                </p>
            </section>
        </>
    );
}