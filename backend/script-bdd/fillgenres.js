import axios from 'axios';
import { appDataSource } from '../datasource.js';
import Genre from '../entities/genre.js';

const fetchGenres = async () => {
    try {
        const header = { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo` };
        const response = await axios.get(
            'https://api.themoviedb.org/3/genre/movie/list',
            {
                params: {
                    language: 'en-US',
                },
                headers: header,
            }
        );
        const genres = response.data.genres;
        console.log(genres);

        await appDataSource.initialize();
        const genreRepository = appDataSource.getRepository(Genre);

        for (const genre of genres) {
            const newGenre = genreRepository.create({
                imdb_id: genre.id,
                name: genre.name,
            });
            await genreRepository.save(newGenre);
        }
    } catch (error) {
        console.log(error);
    }
};

fetchGenres();


