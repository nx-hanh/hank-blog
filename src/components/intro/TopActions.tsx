import React, { FC } from 'react';

import { Button } from '@/components/ui/button';

interface TopActionsProps {
  writerDone: boolean;
}

const TopActions: FC<TopActionsProps> = ({ writerDone }) => {
  const hidden = writerDone ? 'hidden' : '';
  return (
    <Button
      type="button"
      className={`${hidden} text-foreground absolute right-20 top-10 
                bg-transparent font-bold tracking-wider
                hover:bg-transparent hover:text-gray-500`}
    >
      SKIP INTRO
    </Button>
  );
};

export default TopActions;
