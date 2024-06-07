import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import Movie from '../../components/Movie/Movie';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useFetchMovies } from '../../components/Movie/useFetchMovies';

function Home() {
  const [movieName, setMovieName] = useState('');
  const { movies, moviesLoadingError, genres } = useFetchMovies();

  const API_KEY =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo';
  
  
  const listMoviesTitles = movies.map((movie) => (
    <li>{movie.original_title}</li>
  ));


  return (
    <div className="App">
      <header className="App-header">
        <h1> CACAFLIX </h1>
        <img
          src="https://us-tuna-sounds-images.voicemod.net/7d3afa92-e900-4354-96c4-920b8a7e290b-1715507655354.png"
          alt="Example"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <p>
          RECHERCHER :<br></br>
          <input
            type="text"
            value={movieName}
            onChange={(event) => setMovieName(event.target.value)}
          />
        </p>
        <p>{movieName}</p>
        {moviesLoadingError && <p>{moviesLoadingError}</p>}
        <div className="movie-grid">
          <Movie movies={movies} genres={genres} />
        </div>
      </header>
    </div>
  );
}

export default Home;
