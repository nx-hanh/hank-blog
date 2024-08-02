import React, { FC } from 'react';

interface loadingProps {}

const Loading: FC<loadingProps> = () => {
  return (
    <div className="fixed left-0 top-0 z-50 size-full bg-white opacity-75">
      <div className="flex size-full items-center justify-center">
        <div className="border-main-pattern size-16 animate-spin rounded-full border-y-2"></div>
      </div>
    </div>
  );
};

export default Loading;
