import {FC} from "react";
import styles from './Content.module.css';
import {useQuery} from "@tanstack/react-query";
import {fetchMovies} from "../../services/api.service";
import {Movie} from "../../types";
import MovieList from "../MovieList/MovieList";

const Content: FC = () => {
  const {data: movies = [], error, isLoading} = useQuery<Movie[]>({queryKey: ['movies'], queryFn: fetchMovies});

  return (
    <div className={styles.content}>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <MovieList movies={movies} />
    </div>
  );
};

export default Content;
