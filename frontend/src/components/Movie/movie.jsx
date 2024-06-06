import React from 'react';
import './Movie.css';

const Movie = ({ movie }) => {
  const { title, release_date, poster_path } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleMovieClick = () => {
    const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(
      title
    )}`;
    window.open(wikiUrl, '_blank');
  };

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className="movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>

            <div className="genres">
              {movie.genre_ids?.map((genre, genreIndex) => (
                <span key={genreIndex} className="genre-box">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Movie;
