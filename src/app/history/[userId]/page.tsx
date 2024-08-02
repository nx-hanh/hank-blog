import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import AllHistory from '@/components/history/AllHistory';
import { redirect } from '@/lib/i18n';

export default async function Page({ params }: { params: { userId: string } }) {
  const session = await getServerSession(authOptions);
  const checkUser = !!session?.user && session?.user?.id === params.userId;
  if (!checkUser) {
    redirect('/');
  }
  return (
    <main className="size-full py-5">
      <AllHistory userId={params.userId} />
    </main>
  );
}
