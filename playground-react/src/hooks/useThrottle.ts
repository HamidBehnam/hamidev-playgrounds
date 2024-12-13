import { useEffect, useRef, useState } from "react";

const useThrottle = <T,>(value: T, delay = 500) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastCalled = useRef(0);

    useEffect(() => {
        let now = Date.now();
        if (now - lastCalled.current >= delay) {
            setThrottledValue(value);
            lastCalled.current = now;
        } else {
            let timeout = setTimeout(() => {
                setThrottledValue(value);
                lastCalled.current = Date.now();
            }, delay - (now - lastCalled.current));

            return () => clearTimeout(timeout);
        }
    }, [value, delay]);

    return throttledValue;
};

export default useThrottle;
