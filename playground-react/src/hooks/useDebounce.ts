import {useEffect, useState} from "react";

const useDebounce = <T,>(subject: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(subject);

  useEffect(() => {
    let timeout = setTimeout(() => setDebouncedValue(subject), delay);

    return () => clearTimeout(timeout);
  }, [subject, delay]);

  return debouncedValue;
}

export default useDebounce;
