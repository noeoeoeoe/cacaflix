import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  const fetchMovies = async () => {
    setMoviesLoadingError(null);
  
    try {
      const movies = [];
      const apiKey ='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'; // Remplacez YOUR_API_KEY par votre propre clé API
  
      for (let page = 1; page <= 5; page++) {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/movie/popular',
          params: { language: 'en-US', page: page },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        };
  
        const response = await axios.request(options);
        movies.push(...response.data.results);
      }
  
      console.log('All movies:', movies);
      setMovies(movies);
    } catch (error) {
      setMoviesLoadingError('An error occurred while fetching movies.');
      console.error('An error occurred while fetching movies:', error);
    }
  };
  

  const fetchGenres = () => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/genre/movie/list',
      params: { language: 'en' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setGenres(response.data.genres);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // fetch users on component mount
  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  return { movies, moviesLoadingError, genres, fetchMovies };
}