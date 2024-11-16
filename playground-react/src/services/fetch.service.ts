// The reason to have this service is to be able to use it in both React hooks like useFetch and in services like api.service.ts for React Query.
const fetchApi = async (url: string, init?: RequestInit) => {
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
};

export default fetchApi;
