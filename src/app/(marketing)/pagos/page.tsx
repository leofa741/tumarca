// app/pago/page.tsx
'use client';
// app/pago/page.tsx
export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.1)] border border-[#e6e9eb]">
        
        {/* Header estilo PayPal */}
        <div className="px-6 pt-6 pb-4 border-b border-[#e6e9eb]">
          {/* Logo tipo PayPal (texto) */}
          <div className="flex items-center gap-1">
            <span className="text-[#003087] text-2xl font-bold tracking-tight">Pay</span>
            <span className="text-[#0070ba] text-2xl font-bold tracking-tight">Pal</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-6">
          
          {/* Título principal */}
          <div className="text-center space-y-2">
            <h1 className="text-[#2c2e2f] text-xl font-semibold">Pagar servicios</h1>
            <p className="text-[#697386] text-sm">
              Completá tu pago de forma rápida y segura
            </p>
          </div>

          {/* Tarjeta de resumen */}
          <div className="bg-[#f9fafb] rounded-lg p-4 border border-[#e6e9eb]">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#697386] text-sm">Concepto</span>
                <span className="text-[#2c2e2f] text-sm font-medium">Servicios profesionales</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#697386] text-sm">Método de pago</span>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#003087">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.008a.777.777 0 0 1 .766-.672h5.894c2.058 0 3.682.435 4.873 1.305 1.19.87 1.814 2.19 1.872 3.96.05 1.527-.32 2.856-1.108 3.988-.788 1.132-1.92 1.93-3.395 2.394-1.476.464-3.29.696-5.443.696h-1.33l-.397 2.52a.641.641 0 0 1-.633.54Z"/>
                  </svg>
                  <span className="text-[#2c2e2f] text-sm font-medium">PayPal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badge de seguridad estilo PayPal */}
          <div className="flex items-start gap-3 bg-[#e6f4f1] text-[#1a7f72] px-4 py-3 rounded-lg">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <p className="text-sm leading-relaxed">
              Tu transacción está protegida con encriptación de extremo a extremo. 
              No compartimos tus datos financieros.
            </p>
          </div>

          {/* TU BOTÓN - Adaptado al estilo PayPal pero manteniendo tu esencia */}
          <button
            onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=6WZGSW58C4TZG', '_blank')}
            className="w-full px-4 py-3 bg-[#0070ba] hover:bg-[#005ea6] active:bg-[#004c95] text-white rounded-full text-sm font-semibold transition-colors shadow-[0_2px_4px_rgba(0,112,186,0.3)] hover:shadow-[0_4px_8px_rgba(0,112,186,0.4)] flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.008a.777.777 0 0 1 .766-.672h5.894c2.058 0 3.682.435 4.873 1.305 1.19.87 1.814 2.19 1.872 3.96.05 1.527-.32 2.856-1.108 3.988-.788 1.132-1.92 1.93-3.395 2.394-1.476.464-3.29.696-5.443.696h-1.33l-.397 2.52a.641.641 0 0 1-.633.54Z"/>
            </svg>
            🫶 Pagar Servicios
          </button>

          {/* Texto legal estilo PayPal */}
          <p className="text-center text-[#697386] text-xs leading-relaxed">
            Al continuar, aceptás los <a href="#" className="text-[#0070ba] hover:underline">Términos de Uso</a> y la <a href="#" className="text-[#0070ba] hover:underline">Política de Privacidad</a> de PayPal.
          </p>

        </div>

        {/* Footer estilo PayPal */}
        <div className="px-6 py-4 bg-[#f9fafb] border-t border-[#e6e9eb] text-center">
          <p className="text-[#697386] text-xs">
            ¿Necesitás ayuda? <a href="mailto:hola@tumarca.ar" className="text-[#0070ba] hover:underline font-medium">Contactanos</a>
          </p>
        </div>

      </div>

      {/* Copyright discreto */}
      <p className="fixed bottom-4 text-[#697386] text-xs">
        © {new Date().getFullYear()} Tu Marca AR. Todos los derechos reservados.
      </p>
      
    </main>
  );
}