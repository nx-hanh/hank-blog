'use client';
import { useState } from 'react';

import BottomActions from '@/components/intro/BottomActions';
import TopActions from '@/components/intro/TopActions';
import TypeWriter from '@/components/intro/TypeWriter';

const Home = () => {
  const [writerDone, setWriterDone] = useState(false);
  return (
    <section
      className="container relative flex h-svh flex-col items-center justify-center
      shadow-lg"
    >
      {/* top actions */}
      <TopActions writerDone={writerDone} />
      {/* content */}
      <TypeWriter setWriterDone={setWriterDone} />
      {/* bottom actions */}
      <BottomActions writerDone={writerDone} />
    </section>
  );
};

export default Home;
