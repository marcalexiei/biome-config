import { useCallback, useEffect, useState } from 'react';
import type { JSX } from 'react';

export function FooBar(): JSX.Element {
  const [s, setS] = useState('');

  // triggers lint/correctness/useExhaustiveDependencies
  useEffect(() => {
    s.trim();
  }, []);

  useCallback(() => {
    setS('ciao');
  }, []);

  return (
    <>
      {s}
      {/* triggers lint/correctness/noChildrenProp */}
      <div children="test" />
    </>
  );
}
