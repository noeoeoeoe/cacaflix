import { Link } from 'react-router-dom';
import './Movie.css';

const Movie = ({ key, movie }) => {
  let image_src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`

  let releaseDate = new Date(movie.release_date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="movie-container">
      <div className='left-container'>
        <h2>{movie.title} - {releaseDate}</h2>

        <p>{movie.overview}</p>
      </div>
      <div className='right-container'><img src={image_src} className="App-logo" alt="logo" /></div>
    </div>
  );
};

export default Movie;
