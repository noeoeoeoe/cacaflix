import axios from 'axios';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import Actor from '../entities/actor.js';
import Genre from '../entities/genre.js';



const fetchData = async () => {
    try {
        const header = { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo` };
        
        const totalPages = 50; // Définir le nombre de pages à récupérer
        const allMovies = [];

        for (let page = 1; page <= totalPages; page++) {
            const response = await axios.get(
                'https://api.themoviedb.org/3/movie/top_rated',
                {
                    params: {
                        language: 'en-US',
                        page: page,
                    },
                    headers: header,
                }
            );
            const data = response.data.results;
            allMovies.push(...data);
        }

        await appDataSource.initialize();

        const movieRepository = appDataSource.getRepository(Movie);
        for (const movieData of allMovies) {
            //console.log(movieData);

            const credits = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieData.id}/credits?language=en-US`,
                {
                    params: {
                    language: 'en-US',
                    page: 1,
                    },
                    headers: header,
                }
            );

            const newMovie = movieRepository.create({
                title: movieData.title,
                adult: movieData.adult,
                //genre_ids: movieData.genre_ids,
                original_language: movieData.original_language,
                imdb_id: movieData.id,
                overview: movieData.overview,
                popularity: movieData.popularity,
                poster_path: movieData.poster_path,
                release_date: movieData.release_date,
                vote_average: movieData.vote_average,
                vote_count: movieData.vote_count,
                first_actor: credits.data.cast[0].id,
                second_actor: credits.data.cast[1].id,
                realisator: credits.data.crew[0].id,
                main_genre: movieData.genre_ids[0],

            });



            //newMovie.actors = movieData.actors.map(actor => actorMap.get(actor.imdb_id));

            //newMovie.genres = movieData.genre_ids.map(genreId => genreMap.get(genreId));
            //console.log(newMovie);
            await movieRepository.save(newMovie);
        }

    } catch (error) {
      console.log(error);
    }
};

fetchData();

