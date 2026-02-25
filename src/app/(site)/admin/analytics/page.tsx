import { authOptions } from '@/app/(site)/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import AnalyticsClient from './AnalyticsClient';
import { ADMIN_EMAILS } from '@/lib/admins';

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    redirect('/admin/login');
  }

  return <AnalyticsClient />;
}