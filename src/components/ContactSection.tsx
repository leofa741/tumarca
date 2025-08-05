// components/ContactSection.tsx
import { Mail, Phone, MessageSquare, Clock } from 'lucide-react';
import FormContact from './FormContact';

export default function ContactSection() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-28 lg:py-36">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Título */}
        <h2 className="text-4xl md:text-6xl font-semibold text-white">
          Estamos listos para ayudarte
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          ¿Tenés un proyecto en mente o querés potenciar tu marca? <strong>Hablemos</strong>. 
          Estamos aquí para escucharte y acompañarte en cada paso.
        </p>

        {/* Información de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Email */}
          <a
            href="mailto:hola@tumarca.ar"
            className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
          >
            <Mail className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" size={28} />
            <h3 className="text-white font-semibold mb-2">Envianos un mail</h3>
            <p className="text-gray-300 text-sm">hola@tumarca.ar</p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/541141461312"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
          >
            <MessageSquare className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" size={28} />
            <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
            <p className="text-gray-300 text-sm">+54 11 4146-1312</p>
          </a>

          {/* Disponibilidad */}
          <div className="flex flex-col items-center p-6 bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl">
            <Clock className="text-amber-500 mb-4" size={28} />
            <h3 className="text-white font-semibold mb-2">Horario de contacto</h3>
            <p className="text-gray-300 text-sm">Lunes a Viernes<br />9:00 a 18:00 hs</p>
          </div>
        </div>

        {/* Llamado al formulario */}
        <div className="mt-12 bg-gradient-to-r from-gray-900/50 to-transparent border-l-4 border-amber-500 pl-6">
          <p className="text-gray-300 text-lg">
            Preferís escribirnos por formulario? <br className="md:hidden" />
            <strong className="text-white">Completalo y te respondemos en menos de 24 horas.</strong>
          </p>
        </div>

        {/* Formulario */}
        <div className="mt-10">
          <FormContact />
        </div>

        {/* Nota final */}
        <p className="text-gray-500 text-sm mt-8">
          Sin compromiso • Respuesta garantizada • Próximos cupos en 7 días
        </p>
      </div>
    </section>
  );
}