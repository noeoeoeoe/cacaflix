import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';


const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    });
});

const sortMovies = (movies) => {
  movies.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  });
  return movies;
};

router.get('/recommanded', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movies) {
      movies = sortMovies(movies);
      res.json({ movies: movies });
    });
});

router.post('/new', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    title: req.body.title,
    date: req.body.date,
  });

  movieRepository
    .save(newMovie)
    .then(function (savedMovie) {
      res.status(201).json({
        message: 'Movie successfully created',
        id: savedMovie.id,
      });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while creating the movie',
        error: error
       });
    });
});

export default router;


