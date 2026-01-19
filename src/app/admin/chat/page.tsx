// app/admin/chat/page.tsx
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import AdminChatClient from './AdminChatClient';

export default async function AdminChatPage() {
  const session = await getServerSession(authOptions);
  console.log("✅ Sesión activa en /admin/chat:", session?.user?.email);

  if (!session || session.user?.email !== 'rotafelipexx1@gmail.com') {
    redirect('/admin/login');
  }

  return <AdminChatClient />;
}