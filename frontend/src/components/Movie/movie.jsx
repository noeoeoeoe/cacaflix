import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Movie.css';

const Movie = ({ movies, genres }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const findGenre = (genresList, genreId) => {
    const genre = genresList.find((caca) => caca.id === genreId);

    return genre ? genre.name : 'Genre inconnu';
  };

  // Calculer l'index de début et de fin des films à afficher pour la page actuelle
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="movie-list">
      {currentMovies.map((movie) => {
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
      <div>
        <div className="movie-list">{/* Movie list rendering */}</div>
        {/* Pagination */}
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(movies.length / moviesPerPage) },
            (_, i) => (
              <button key={i + 1} onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
