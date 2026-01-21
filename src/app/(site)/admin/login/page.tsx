// app/admin/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();

  // Opcional: redirigir si ya estás logueado
  useEffect(() => {
    // Esto es solo para UX; la protección real está en el servidor
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4">
      <div  className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Acceso al Panel</h1>
        <button
          onClick={() =>
            signIn('google', {
              callbackUrl: '/admin/chat', // ← ¡Esta es la clave!
            })
          }
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center justify-center gap-2"  
        
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.991 4.785 1.849l3.292-3.292C18.186 1.29 16.082 0 12.24 0c-6.43 0-11.582 5.255-11.582 11.74 0 6.485 5.152 11.74 11.582 11.74 6.43 0 11.582-5.255 11.582-11.74 0-.493-.055-.98-.134-1.458H12.24z"
            />
          </svg>
          Iniciar sesión con Google
        </button>
        </div>
    </div>
  );
}