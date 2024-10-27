import {useEffect, useState} from "react";

const useDebounce = <T,>(subject: T, delay = 500) => {
  const [signal, setSignal] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => setSignal(!signal), delay);

    return () => clearTimeout(timeout);
  }, [subject, delay]);

  return signal;
}

export default useDebounce;
