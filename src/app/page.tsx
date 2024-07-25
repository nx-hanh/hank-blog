import IntroBody from '@/components/intro/IntroBody';

export default async function Home() {
  return (
    <section
      className="container relative flex h-svh flex-col items-center justify-center
      shadow-lg"
    >
      <IntroBody />
    </section>
  );
}
