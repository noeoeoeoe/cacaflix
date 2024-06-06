import axios from 'axios';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import Actor from '../entities/actor.js';

const fetchData = async () => {
    try {
        const header = { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo` };
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
        const data = response.data.results;

        const movieRepository = appDataSource.getRepository(Movie);
        console.log(movieRepository);
        for (const movieData of data) {
            console.log(movieData);
            const newMovie = movieRepository.create({
                title: movieData.title,
                adult: movieData.adult,
                //genre_ids: movieData.genre_ids,
                original_language: movieData.original_language,
                overview: movieData.overview,
                popularity: movieData.popularity,
                poster_path: movieData.poster_path,
                release_date: movieData.release_date,
                vote_average: movieData.vote_average,
                vote_count: movieData.vote_count
            });
            console.log(newMovie);
            await movieRepository.save(newMovie);
        }

    } catch (error) {
      console.log(error);
    }
};

fetchData();