import {FC} from "react";
import {Movie} from "../../types";
import styles from './MovieListItem.module.css';

interface MovieListItemProps {
  movie: Movie;
}

const MovieListItem: FC<MovieListItemProps> = ({movie}) => {
  return (
    <div className={styles.movieListItem}>
      <img src={movie.image} alt={movie.name}/>
    </div>
  );
};

export default MovieListItem;
