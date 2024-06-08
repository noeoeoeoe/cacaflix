import './Home.css';
import { useState, useEffect } from 'react';
import Movie from '../../components/Movie/movie';
import { useFetchMovies } from '../../components/Movie/useFetchMovies';

function Home() {
  const [movieName, setMovieName] = useState('');
  const { movies, moviesLoadingError, genres } = useFetchMovies();
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    function Filtre(movieList, search) {
      return movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (movies) {
      setFilteredMovies(Filtre(movies, movieName));
    }
  }, [movieName, movies]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Des millions de films qui n'attendent que vous</h2>
        <p>
          Rechercher :<br></br>
          <input
            type="text"
            value={movieName}
            onChange={(event) => setMovieName(event.target.value)}
          />
        </p>
        {moviesLoadingError && <p>{moviesLoadingError}</p>}
        <div className="movie-grid">
          <Movie movies={filteredMovies} genres={genres} />

        </div>
      </header>
    </div>
  );
}

export default Home;