import './Home.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
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
        <ul>
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </ul>

        <a
          className="App-link"
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
