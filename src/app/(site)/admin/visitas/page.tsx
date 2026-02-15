// app/admin/visitas/page.tsx
import { authOptions } from '@/app/(site)/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import VisitasClient from './VisitasClient';
import { ADMIN_EMAILS } from '@/lib/admins';

export default async function VisitasPage() {
  const session = await getServerSession(authOptions);
  console.log('✅ Sesión activa en /admin/visitas:', session?.user?.email);
  const userEmail = session?.user?.email;

  if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    redirect('/admin/login');
  }

  if (!session || !ADMIN_EMAILS.includes(userEmail)) {
    redirect('/admin/login');
  }

  return <VisitasClient />;
}