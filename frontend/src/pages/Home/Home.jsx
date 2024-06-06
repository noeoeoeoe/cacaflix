import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import Movie from './../../components/Movie/Movie';
import MovieCard from './../../components/MovieCard/MovieCard';


function Home() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);

  const API_KEY =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo';
  
  /*const fetchData = async () => {
    try {
      const header = { Authorization: `Bearer ${API_KEY}` };
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/top_rated',
        {
          params: {
            language: 'en-US',
            page: 1,
          },
          headers: header,
        }
      );

      setMovies(response.data.results.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };*/

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/movies/recommanded');
      setMovies(response.data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // This will run every time `movies` state changes
    console.log(movies);
  }, [movies]);

  const listMoviesTitles = movies.map((movie) => (
    <li>{movie.original_title}</li>
  ));

  return (
    <div className="App-container">
      <div className="main-content">
        <div className="hero-home">
          <h1>Films et séries en illimité, et bien plus</h1>
          <div className="search-bar">
            <input
              type="text"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              name=""
              id="main-search"
            />
            <button id="main-search-button">Rechercher</button>
          </div>
          <h2>{movieName}</h2>
        </div>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
