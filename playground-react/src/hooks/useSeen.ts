import {RefObject, useEffect, useRef, useState} from "react";

const useSeen = <T extends HTMLElement>(): [RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        observer.disconnect();
      }
    }, {threshold: 1});

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, seen];
};

export default useSeen;
