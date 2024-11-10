import { useEffect, useRef, useState } from "react";

const useThrottle = <T,>(value: T, delay = 500) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastCalled = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCalled.current;

    if (timeSinceLastCall >= delay) {
      setThrottledValue(value);
      lastCalled.current = now;
    } else {
      const timeoutId = setTimeout(() => {
        setThrottledValue(value);
        lastCalled.current = Date.now();
      }, delay - timeSinceLastCall);

      return () => clearTimeout(timeoutId);
    }
  }, [value, delay]);

  return throttledValue;
};

export default useThrottle;
