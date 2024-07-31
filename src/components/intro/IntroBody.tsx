'use client';
import React, { FC, useState } from 'react';

import BottomActions from '@/components/intro/BottomActions';
import TopActions from '@/components/intro/TopActions';
import TypeWriter from '@/components/intro/TypeWriter';

interface IntroBodyProps {
  isLogin: boolean;
}

const IntroBody: FC<IntroBodyProps> = ({ isLogin }) => {
  const [writerDone, setWriterDone] = useState(false);
  const [isSkip, setIsSkip] = useState(isLogin);

  return (
    <>
      {/* top actions */}
      <TopActions
        isSkip={isSkip}
        writerDone={writerDone}
        setIsSkip={setIsSkip}
      />
      {/* content */}
      <TypeWriter isSkip={isSkip} setWriterDone={setWriterDone} />
      {/* bottom actions */}
      <BottomActions isSkip={isSkip} writerDone={writerDone} />
    </>
  );
};

export default IntroBody;
