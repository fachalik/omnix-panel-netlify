import { useState } from 'react';

export default function useIsLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return { isLoading, setIsLoading };
}
