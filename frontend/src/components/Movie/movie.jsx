import { Link } from 'react-router-dom';
import React from 'react';
import './Movie.css';

const Movie = ({ movies, genres }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const findGenre = (genresList, genreId) => {
    const genre = genresList.find((caca) => caca.id === genreId);

    return genre ? genre.name : 'Genre inconnu';
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => {
        return (
          <Link key={movie.id} className="Link" to={`/movies/${movie.id}`}>
            <div className="movie-item">
              <div className="movie">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{formatDate(movie.release_date)}</p>
                <div className="genres">
                  {movie.genre_ids.map((genreId) => (
                    <span key={genreId} className="genre-box">
                      {findGenre(genres, genreId)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Movie;
