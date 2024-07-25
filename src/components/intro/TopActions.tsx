'use client';
import React, { FC } from 'react';

import { Button } from '@/components/ui/button';

interface TopActionsProps {
  isSkip: boolean;
  writerDone: boolean;
  setIsSkip: (value: boolean) => void;
}

const TopActions: FC<TopActionsProps> = ({ isSkip, writerDone, setIsSkip }) => {
  const hidden = writerDone || isSkip ? 'hidden' : '';
  return (
    <Button
      type="button"
      className={`${hidden} text-foreground absolute right-20 top-10 
                bg-transparent font-bold tracking-wider
                hover:bg-transparent hover:text-gray-500`}
      onClick={() => setIsSkip(true)}
    >
      SKIP INTRO
    </Button>
  );
};

export default TopActions;
