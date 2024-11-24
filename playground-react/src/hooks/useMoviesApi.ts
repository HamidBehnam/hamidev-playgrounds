import useFetch from "./useFetch";
import {useCallback} from "react";

const useMoviesApi = () => {
  const fetchApi = useFetch();

  const getMovies = useCallback(async () => {
    return fetchApi('/mocked_apis/movies.json');
  }, []);

  return {getMovies};
};

export default useMoviesApi;
