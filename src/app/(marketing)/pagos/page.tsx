// app/pago/page.tsx
'use client';
import Head from 'next/head';

export default function PaymentPage() {
  return (
    <>
      <Head>
        <title>Pago de Servicios | Tu Marca AR</title>
        <meta name="description" content="Completá tu pago de forma segura con PayPal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-[#f5f7fa] dark:bg-[#0d1117] flex flex-col transition-colors duration-200">
        
        {/* ========== HEADER CON LOGO ========== */}
        <header className="w-full bg-white dark:bg-[#161b22] border-b border-[#e6e9eb] dark:border-[#30363d] px-4 py-3">
          <div className="max-w-md mx-auto flex items-center justify-between">
            {/* Logo Tu Marca AR */}
            <a href="https://tumarca.ar" className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-[#0d1117] dark:text-white text-lg font-bold tracking-tight">Tu</span>
                <span className="text-[#0070ba] dark:text-[#58a6ff] text-lg font-bold tracking-tight">Marca</span>
                <span className="text-[#697386] dark:text-[#8b949e] text-lg font-light">AR</span>
              </div>
            </a>
            
          
          </div>
        </header>

        {/* ========== CONTENIDO PRINCIPAL ========== */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161b22] rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] border border-[#e6e9eb] dark:border-[#30363d] transition-colors duration-200">
            
            <div className="px-6 py-8 space-y-6">
              
              {/* Título */}
              <div className="text-center space-y-2">
                <h1 className="text-[#2c2e2f] dark:text-[#f0f6fc] text-xl font-semibold">Pagar servicios</h1>
                <p className="text-[#697386] dark:text-[#8b949e] text-sm">
                  Completá tu pago de forma rápida y segura
                </p>
              </div>

              {/* Resumen */}
              <div className="bg-[#f9fafb] dark:bg-[#21262d] rounded-lg p-4 border border-[#e6e9eb] dark:border-[#30363d] transition-colors duration-200">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#697386] dark:text-[#8b949e] text-sm">Concepto</span>
                    <span className="text-[#2c2e2f] dark:text-[#f0f6fc] text-sm font-medium">Servicios profesionales</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#697386] dark:text-[#8b949e] text-sm">Método de pago</span>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#003087">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.008a.777.777 0 0 1 .766-.672h5.894c2.058 0 3.682.435 4.873 1.305 1.19.87 1.814 2.19 1.872 3.96.05 1.527-.32 2.856-1.108 3.988-.788 1.132-1.92 1.93-3.395 2.394-1.476.464-3.29.696-5.443.696h-1.33l-.397 2.52a.641.641 0 0 1-.633.54Z"/>
                      </svg>
                      <span className="text-[#2c2e2f] dark:text-[#f0f6fc] text-sm font-medium">PayPal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge seguridad */}
              <div className="flex items-start gap-3 bg-[#e6f4f1] dark:bg-[#1a3d3a] text-[#1a7f72] dark:text-[#56d4bb] px-4 py-3 rounded-lg transition-colors duration-200">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                <p className="text-sm leading-relaxed">
                  Tu transacción está protegida con encriptación de extremo a extremo.
                </p>
              </div>

              {/* TU BOTÓN */}
              <button
                onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=6WZGSW58C4TZG', '_blank')}
                className="w-full px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded text-xs font-medium transition-all transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg"
              >
                🫶 Pagar Servicios
              </button>

              {/* Legal */}
              <p className="text-center text-[#697386] dark:text-[#8b949e] text-xs leading-relaxed">
                Al continuar, aceptás los <a href="#" className="text-[#0070ba] dark:text-[#58a6ff] hover:underline">Términos</a> y <a href="#" className="text-[#0070ba] dark:text-[#58a6ff] hover:underline">Privacidad</a> de PayPal.
              </p>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#f9fafb] dark:bg-[#21262d] border-t border-[#e6e9eb] dark:border-[#30363d] text-center transition-colors duration-200">
              <p className="text-[#697386] dark:text-[#8b949e] text-xs">
                ¿Dudas? <a href="mailto:hola@tumarca.ar" className="text-[#0070ba] dark:text-[#58a6ff] hover:underline font-medium">hola@tumarca.ar</a>
              </p>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <footer className="py-4 text-center">
          <p className="text-[#697386] dark:text-[#8b949e] text-xs">
            © {new Date().getFullYear()} Tu Marca AR. Buenos Aires, Argentina.
          </p>
        </footer>

      </main>
    </>
  );
}