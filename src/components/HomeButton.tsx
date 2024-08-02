'use client';
import React, { FC } from 'react';
import { HomeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface HomeButtonProps {}

const HomeButton: FC<HomeButtonProps> = () => {
  const router = useRouter();
  return (
    <Button
      type="button"
      onClick={() => router.push('/')}
      variant="secondary"
      size="icon"
      className="bg-background flex size-12 items-center justify-center rounded-full border-[3px] border-black hover:bg-gray-500/75 dark:border-gray-700 dark:hover:bg-gray-800/75"
    >
      <HomeIcon size={24} />
    </Button>
  );
};

export default HomeButton;
