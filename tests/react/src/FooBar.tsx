import { type JSX, useCallback, useEffect, useState } from 'react';

export function FooBar(): JSX.Element {
  const [s, setS] = useState('');

  useEffect(() => {
    s.trim();
  }, []);

  useCallback(() => {
    setS('ciao');
  }, []);

  return <>{s}</>;
}
