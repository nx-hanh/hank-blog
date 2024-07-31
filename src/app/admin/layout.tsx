import React, { ReactNode } from 'react';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { ADMIN_EMAIL } from '@/lib/constant';
import { redirect } from '@/lib/i18n';

type LayoutProps = {
  children: ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  const isAdmin = !!session?.user && session?.user?.email === ADMIN_EMAIL;
  if (!isAdmin) {
    redirect('/');
  }
  return <main className="container min-h-svh">{children}</main>;
};

export default Layout;
