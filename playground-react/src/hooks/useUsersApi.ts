import { useCallback } from "react";
import { usersAPIBaseUrl } from "../constants";
import useFetch from "./useFetch";


interface UsersParams {
  term: string;
}


const useUsersApi = () => {
  const fetchApi = useFetch(3000);

  const getUsers = useCallback(async ({queryKey}: {queryKey: [string, UsersParams]}) => {
    const [_key, {term}] = queryKey;

    const params = new URLSearchParams({
      term
    });

    return fetchApi(`${usersAPIBaseUrl}?${params.toString()}`);
  }, []);

  return {
    getUsers,
  };
};

export default useUsersApi;
