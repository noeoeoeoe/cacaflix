import React from 'react';
import './Movie.css';

const Movie = ({ movie }) => {
  const { title, release_date, poster_path, genre_ids } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="movie">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>Release Date: {release_date}</p>

      <div className="genres">
        {genre_ids.map((genre, genreIndex) => (
          <span key={genreIndex} className="genre-box">
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Movie;
