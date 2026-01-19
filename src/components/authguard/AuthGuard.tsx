// components/AuthGuard.tsx
'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      signIn('google', { callbackUrl: window.location.href });
    }
  }, [session, status]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}