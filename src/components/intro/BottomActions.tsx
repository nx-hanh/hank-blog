import React, { FC } from 'react';

import SignInModel from '@/components/signIn/SignInModel';

interface BottomActionsProps {
  writerDone: boolean;
}

const BottomActions: FC<BottomActionsProps> = ({ writerDone }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      {writerDone && (
        <>
          <button className="text-foreground border-foreground hover:text-background group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-xl  border bg-transparent px-10 py-2 font-semibold uppercase tracking-wider">
            <span className="bg-foreground absolute size-0 rounded-full transition-all duration-300 ease-out group-hover:size-56"></span>
            <span className="relative">Start reading</span>
          </button>
          <p className="mt-4 text-center text-base font-light">
            Want to save your history?
            <SignInModel />
          </p>
        </>
      )}
    </div>
  );
};

export default BottomActions;
