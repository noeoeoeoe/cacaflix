import './Home.css';
import { useState } from 'react';
import Movie from '../../components/Movie/movie';
import { useFetchMovies } from '../../components/Movie/useFetchMovies';

function Home() {
  const [movieName, setMovieName] = useState('');
  const { movies, moviesLoadingError, genres } = useFetchMovies();

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
