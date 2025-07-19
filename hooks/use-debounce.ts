import { useState, useEffect } from 'react';

interface UseDebounceResult<T> {
  value: T;
  isLoading: boolean;
  isSuccess: boolean;
}

const useDebounce = <T>(value: T, delay: number): UseDebounceResult<T> => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setIsSuccess(false);

    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsLoading(false);
      setIsSuccess(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return {
    value: debouncedValue,
    isLoading,
    isSuccess,
  };
};

export default useDebounce;