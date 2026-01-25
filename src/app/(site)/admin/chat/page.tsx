// app/admin/chat/page.tsx
import { authOptions } from '@/app/(site)/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import AdminChatClient from './AdminChatClient';
import { ADMIN_EMAILS } from '@/lib/admins'; // ← misma lista

export default async function AdminChatPage() {
  const session = await getServerSession(authOptions);
  console.log("✅ Sesión activa en /admin/chat:", session?.user?.email);
  const userEmail = session?.user?.email;

  if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    redirect('/admin/login');
  }


  if (!session || !ADMIN_EMAILS.includes(userEmail)) {
    redirect('/admin/login');
  }

  return <AdminChatClient />;
}
