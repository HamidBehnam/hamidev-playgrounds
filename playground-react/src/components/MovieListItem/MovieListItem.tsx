import {FC} from "react";
import {Movie} from "../../types";

interface MovieListItemProps {
  movie: Movie;
}

const MovieListItem: FC<MovieListItemProps> = ({movie}) => {
  return (
    <div className={'hover:cursor-pointer'}>
      <img className={'w-full hover:ring-4 hover:ring-gray-300 hover:ring-offset-2 rounded mb-1'} src={movie.image} alt={movie.name}/>
      <div>{movie.name}</div>
      <div className={'flex gap-3'}>
        <small>{movie.genre}</small>
        <small>{movie.year}</small>
      </div>
    </div>
  );
};

export default MovieListItem;
