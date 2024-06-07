import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import MovieDetail from './components/MovieDetail/MovieDetail';
import { useFetchMovies } from './components/Movie/useFetchMovies';

function App() {
  const { movies, genres } = useFetchMovies();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route
          path="movies/:id"
          element={<MovieDetail movies={movies} genres={genres} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
