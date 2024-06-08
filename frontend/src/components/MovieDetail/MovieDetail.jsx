import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';
import axios from 'axios';

const MovieDetail = ({ movies, genres }) => {
  const { id } = useParams();
  const movie = movies.find((caca) => caca.id.toString() === id);
  const [credits, setCredits] = useState(null);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/' + id + '/credits',
      params: { language: 'en-US' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setCredits(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  const options1 = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/' + id,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
    },
  };

  axios
    .request(options1)
    .then(function (response) {
      setDetails(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  if (credits && credits.crew) {
    const directorData = credits.crew.find(
      (crewMember) => crewMember.job === 'Director'
    );
    movie.director = directorData ? directorData.name : 'Unknown';
  }

  if (details) {
    movie.runtime = details.runtime ? details.runtime : 'Unknown';
  }

  if (credits && credits.cast) {
    movie.cast = credits.cast ? credits.cast : 'Unknown';
  }

  if (!movie) {
    return <div>Film non trouvé</div>;
  }

  return (
    <div className="movie-detail">
      <div className="movie-header">
        <h1>{movie.title}</h1>
        <p>
          Date de sortie:{' '}
          {new Date(movie.release_date).toLocaleDateString('fr-FR')}
        </p>
      </div>
      <div className="movie-body">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className="movie-poster"
        />
        <div className="movie-info">
          <p>
            <strong>Résumé:</strong> {movie.overview}
          </p>
          <p>
            <strong>Directeur:</strong> {movie.director}
          </p>
          <p>
            <strong>Cast:</strong>{' '}
            {movie.cast &&
              movie.cast
                .slice(0, 3)
                .map((actor) => `${actor.name}`)
                .join(', ')}
          </p>
        </div>
      </div>
      <div className="movie-footer">
        <p>
          <strong>Genre:</strong>{' '}
          {movie.genre_ids
            .map(
              (genreId) => genres.find((genre) => genre.id === genreId)?.name
            )
            .join(', ')}
        </p>
        <p>
          <strong>Durée:</strong> {movie.runtime} minutes
        </p>
        <p>
          <strong>Note:</strong> {movie.vote_average}
        </p>
        <div className="reaction">
        <a href="/"><img src="http://localhost:3000/cross.png" className='nope'/></a>
        <a href="/"><img src="http://localhost:3000/like.png" className='like'/></a>

        </div>
        
      </div>
    </div>
  );
};

export default MovieDetail;