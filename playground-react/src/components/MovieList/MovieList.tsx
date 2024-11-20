import {FC} from "react";
import {Movie} from "../../types";
import MovieListItem from "../MovieListItem/MovieListItem";

interface MovieListProp {
  movies: Movie[];
}

const MovieList: FC<MovieListProp> = ({movies}) => {
  return (
    <ul className={`grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 px-4`}>
      {movies?.map(movie => (
        <li key={movie.id}>
          <MovieListItem movie={movie} />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
