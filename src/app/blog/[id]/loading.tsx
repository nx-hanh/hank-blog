import React, { FC } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

interface loadingProps {}

const Loading: FC<loadingProps> = () => {
  return (
    <main
      className={`container mx-auto flex max-w-screen-md flex-col gap-3 py-6`}
    >
      <Skeleton className="h-[200px] w-full rounded-lg shadow-lg" />
      <Skeleton className="h-12 w-1/3 rounded-lg" />
      <Skeleton className="h-6 w-full rounded-lg" />
      <Skeleton className="h-6 w-full rounded-lg" />
      <Skeleton className="h-6 w-full rounded-lg" />
      <Skeleton className="h-6 w-full rounded-lg" />
    </main>
  );
};

export default Loading;
