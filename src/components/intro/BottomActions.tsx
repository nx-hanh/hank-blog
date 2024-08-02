'use client';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClientSafeProvider, getProviders, useSession } from 'next-auth/react';

import { readBlog } from '@/actions/blog.actions';
import SignInModel from '@/components/signIn/SignInModel';
import { useToast } from '@/components/ui/use-toast';
import useServerAction from '@/hooks/useServerAction';

interface BottomActionsProps {
  writerDone: boolean;
  isSkip: boolean;
}

const BottomActions: FC<BottomActionsProps> = ({ writerDone, isSkip }) => {
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);
  const [runAction, isPending] = useServerAction(readBlog);
  const { toast } = useToast();
  const router = useRouter();
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
  const handleRead = async () => {
    const blog = await runAction(data?.user?.id);
    if (blog) {
      router.push(`/blog/${blog.id}`);
    } else {
      toast({
        title: 'No blog found',
        description: 'Sorry, no blog found',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      {isShow && (
        <>
          <button
            type="button"
            onClick={handleRead}
            className="text-foreground border-foreground hover:text-background group relative inline-flex min-h-6 min-w-32 cursor-pointer items-center justify-center overflow-hidden rounded-xl  border bg-transparent px-10 py-2 font-semibold uppercase tracking-wider"
          >
            {isPending ? (
              <>
                <div className="flex min-h-6 min-w-32 items-center justify-center space-x-2 dark:invert">
                  <div className="bg-foreground size-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
                  <div className="bg-foreground size-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
                  <div className="bg-foreground size-2 animate-bounce rounded-full"></div>
                </div>
              </>
            ) : (
              <>
                <span className="bg-foreground absolute size-0 rounded-full transition-all duration-300 ease-out group-hover:size-56"></span>
                <span className="relative">Start reading</span>
              </>
            )}
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
