'use client';
import React, { FC, useEffect, useState } from 'react';
import { ClientSafeProvider, getProviders, useSession } from 'next-auth/react';

import SignInModel from '@/components/signIn/SignInModel';

interface BottomActionsProps {
  writerDone: boolean;
  isSkip: boolean;
}

const BottomActions: FC<BottomActionsProps> = ({ writerDone, isSkip }) => {
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);
  const { data } = useSession();
  const isShow = writerDone || isSkip;
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      if (res) {
        setProviders(Object.values(res));
      }
    };
    fetchProviders();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      {isShow && (
        <>
          <button className="text-foreground border-foreground hover:text-background group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-xl  border bg-transparent px-10 py-2 font-semibold uppercase tracking-wider">
            <span className="bg-foreground absolute size-0 rounded-full transition-all duration-300 ease-out group-hover:size-56"></span>
            <span className="relative">Start reading</span>
          </button>
          {data ? (
            <p className="pointer-events-none mt-4 text-center text-base font-light">
              Welcome back!
              <span className="ml-2 text-lg font-semibold tracking-wide">
                {data.user?.name}
              </span>
            </p>
          ) : (
            <p className="mt-4 text-center text-base font-light">
              Want to save your history?
              <SignInModel providers={providers} />
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default BottomActions;
