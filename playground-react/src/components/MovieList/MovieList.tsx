import {FC} from "react";
import {Movie} from "../../types";
import MovieListItem from "../MovieListItem/MovieListItem";
import styles from './MovieList.module.css';

interface MovieListProp {
  movies: Movie[];
}

const MovieList: FC<MovieListProp> = ({movies}) => {
  return (
    <ul className={styles.movieList}>
      {movies?.map(movie => (
        <li key={movie.id}>
          <MovieListItem movie={movie} />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
