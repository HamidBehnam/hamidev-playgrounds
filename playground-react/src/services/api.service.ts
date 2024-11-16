import fetchApi from "./fetch.service";

export const fetchMovies = async () => {
  return fetchApi('/mocked_apis/movies.json');
};
