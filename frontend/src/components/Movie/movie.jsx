import React from 'react';
import './Movie.css';

const Movie = ({ movie }) => {
  const { title, release_date, poster_path } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const handleMovieClick = () => {
    const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(
      title
    )}`;
    window.open(wikiUrl, '_blank');
  };

  return (
    <div className="movie">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>Release Date: {release_date}</p>
    </div>
  );
};

export default Movie;
