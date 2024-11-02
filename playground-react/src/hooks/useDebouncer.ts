import {useEffect, useState} from "react";

const useDebounce = <T,>(subject: T, delay = 500) => {
  const [debounceSubject, setDebouncedSubject] = useState<T>(subject);

  useEffect(() => {
    let timeout = setTimeout(() => setDebouncedSubject(subject), delay);

    return () => clearTimeout(timeout);
  }, [subject, delay]);

  return debounceSubject;
};

export default useDebounce;
