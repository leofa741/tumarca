// lib/trackClick.ts
export function trackClick(
  eventName: string,
  metadata: { section?: string; button?: string; [key: string]: any } = {}
) {
  // ✅ Solo ejecutar en cliente
  if (typeof window === 'undefined') return;

  // ✅ Fire-and-forget: no bloqueamos la UI esperando respuesta
  fetch('/api/track-click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName,
      ...metadata,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      pathname: window.location.pathname,
    }),
  })
    .then(async (res) => {
      // ✅ Validar que sea JSON antes de parsear
      const contentType = res.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await res.json();
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Tracking OK:', data);
        }
      }
    })
    .catch((err) => {
      // ✅ Silencioso en producción, visible en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Tracking no disponible:', err);
      }
    });
}