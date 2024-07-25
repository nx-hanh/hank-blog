'use client';
import React, { FC, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import BottomActions from '@/components/intro/BottomActions';
import TopActions from '@/components/intro/TopActions';
import TypeWriter from '@/components/intro/TypeWriter';

interface IntroBodyProps {}

const IntroBody: FC<IntroBodyProps> = () => {
  const { data } = useSession();
  const [writerDone, setWriterDone] = useState(false);
  const [isSkip, setIsSkip] = useState(false);
  useEffect(() => {
    if (data) {
      setIsSkip(true);
    }
  }, [data]);
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
