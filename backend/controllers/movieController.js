import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import Swipe from '../entities/swipe.js';

export const getRecommendations = async (req, res) => {
  //const movies = await appDataSource.getRepository(Movie).find();
  const userId = 1;

  const swipedMovieIds = await appDataSource
    .getRepository(Swipe)
    .createQueryBuilder('swipe')
    .where('swipe.userId = :userId', { userId })
    .select('swipe.movieId')
    .getRawMany();

  const movieIds = swipedMovieIds.map((swipe) => swipe.movieId);
  //console.log(movieIds);

  const movies = await appDataSource
    .getRepository(Movie)
    .createQueryBuilder('movie')
    .where('movie.id NOT IN (:...movieIds)', { movieIds })
    .getMany();

console.log(movies);

  res.json(movies);
};

export const handleSwipe = async (req, res) => {
  const { movieId, action } = req.body;
  const userId = 1; // Pas le temps de faire le système d'authentification mais en théorie ce serait req.user.id
  
  const swipeRepository = appDataSource.getRepository(Swipe);
  const newSwipe = swipeRepository.create({
    user: userId,
    movie: movieId,
    action: action
  });
  await appDataSource.getRepository(Swipe).save(newSwipe);
  res.status(200).send('Swipe recorded');
};
