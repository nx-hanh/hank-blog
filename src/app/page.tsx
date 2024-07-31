import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import IntroBody from '@/components/intro/IntroBody';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isLogin = !!session?.user;
  return (
    <section className="bg-main-pattern container relative flex h-svh flex-col items-center justify-center bg-cover shadow-lg">
      <IntroBody isLogin={isLogin} />
    </section>
  );
}
