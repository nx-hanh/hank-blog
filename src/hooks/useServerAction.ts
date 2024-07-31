import { useEffect, useRef, useState } from 'react';

export const useServerAction = <P extends unknown[], R>(
  action: (...args: P) => Promise<R>,
  onFinished?: (result: R | undefined) => void
): [(...args: P) => Promise<R | undefined>, boolean] => {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<R | undefined>(undefined);
  const [finished, setFinished] = useState(false);
  const resolver = useRef<(value?: R | PromiseLike<R>) => void>();

  useEffect(() => {
    if (!finished) return;

    if (onFinished) onFinished(result);
    resolver.current?.(result);
  }, [result, finished, onFinished]);

  const runAction = async (...args: P): Promise<R | undefined> => {
    setIsPending(true);
    setFinished(false);

    try {
      const data = await action(...args);
      setResult(data);
      setFinished(true);
      return new Promise<R | undefined>((resolve) => {
        resolver.current = resolve;
      });
    } catch (error) {
      setIsPending(false);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return [runAction, isPending];
};

export default useServerAction;
