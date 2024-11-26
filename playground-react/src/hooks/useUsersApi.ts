import { useCallback } from "react";
import { usersAPIBaseUrl } from "../constants";
import useFetch from "./useFetch";

const useUsersApi = () => {
  const fetchApi = useFetch(3000);

  const getUsers = useCallback(async () => {
    return fetchApi(usersAPIBaseUrl);
  }, []);

  return {
    getUsers,
  };
};

export default useUsersApi;
