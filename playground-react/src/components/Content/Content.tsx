import {FC} from "react";
import styles from './Content.module.css';
import {useQuery} from "@tanstack/react-query";
import {Movie} from "../../types";
import MovieList from "../MovieList/MovieList";
import useMoviesApi from "../../hooks/useMoviesApi";

const Content: FC = () => {
  const {getMovies} = useMoviesApi();
  const {data: movies = [], error, isLoading} = useQuery<Movie[]>({queryKey: ['movies'], queryFn: getMovies});

  return (
    <div className={styles.content}>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <MovieList movies={movies} />
    </div>
  );
};

export default Content;
