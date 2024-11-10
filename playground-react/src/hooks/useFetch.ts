import {useCallback} from "react";

const useFetch = () => {
  return useCallback(async (url: string, init?: RequestInit) => {
    const defaultHeaders: HeadersInit = {
      'Authorization': 'Bearer tokenXYZ'
    }

    const processedInit: RequestInit = {
      ...init,
      headers: {
        ...defaultHeaders,
        ...init?.headers
      }
    };

    const response = await fetch(url, processedInit);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    return response.json();
  }, []);
};

export default useFetch;
