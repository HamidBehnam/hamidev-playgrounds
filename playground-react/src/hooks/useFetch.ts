import { useCallback } from "react";

const useFetch = (simulatedDelay = 0) => {
  const fetchApi = useCallback(async (url: string, init?: RequestInit) => {
    const defaultHeaders: HeadersInit = {
      Authorization: "Bearer getTokenFromLocalStorage",
    };

    const processedInit: RequestInit = {
      ...init,
      headers: {
        ...defaultHeaders,
        ...init?.headers,
      },
    };

    const response = await fetch(url, processedInit);

    if (simulatedDelay) {
      await new Promise(resolve => setTimeout(resolve, simulatedDelay));
    }

    if (!response.ok) {
      throw new Error("Network Error, please try agin later.");
    }

    return response.json();
  }, []);

  return fetchApi;
};

export default useFetch;
