import {MutableRefObject, useEffect, useState} from "react";

const useSeen = (elementRef: MutableRefObject<null>) => {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        observer.disconnect();
      }
    }, {threshold: 1});

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  return seen;
};

export default useSeen;
