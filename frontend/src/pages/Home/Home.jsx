import logo from './logo.svg';
import './Home.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Movie from '../../components/Movie/movie';

function Home() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  const fetchMovies = () => {
    setMoviesLoadingError(null);

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular',
      params: { language: 'en-US', page: '1' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occured while fetching movies.');
        console.error(error);
      });
  };

  // fetch users on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1> CACAFLIX </h1>
        <input
          type="text"
          value={movieName}
          onChange={(event) => setMovieName(event.target.value)}
        />
        <p>{movieName}</p>
        {moviesLoadingError && <p>{moviesLoadingError}</p>}
        <div className="movie-grid">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default Home;
