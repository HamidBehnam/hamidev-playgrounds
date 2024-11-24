import {useCallback} from "react";

const useFetch = () => {
  const fetchApi = useCallback(async (url: string, init?: RequestInit) => {
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token'
    };

    const processedInit: RequestInit = {
      ...init,
      headers: {
        ...defaultHeaders,
        ...init?.headers,
      },
    };

    const response = await fetch(url, processedInit);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }, []);

  return fetchApi;
};

export default useFetch;
