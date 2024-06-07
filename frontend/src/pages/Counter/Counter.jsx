import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './../../components/MovieCard/MovieCard';


function Counter() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/movies/recommendations');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleSwipe = async (direction, movie) => {
    console.log("testttt")
    try {
      console.log("coucou1");
      const action = direction === 'right' ? true : false;
      await axios.post('http://localhost:8000/movies/swipe', { movieId: movie.id, action });
      console.log("coucou2");
      const response = await axios.get('http://localhost:8000/movies/recommendation');
      setMovies([response.data, ...movies]);
    } catch (error) {
      console.error('Error handling swipe:', error);
    }
  };

  return (
    <div className="app">
      <img src="./cross.png" alt="nope"  id='nope'/>
      <div className="container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSwipe={handleSwipe} />
        ))}
      </div>
      <img src="./like.png" alt="like" id='like' />
    </div>
  );
}

export default Counter;
