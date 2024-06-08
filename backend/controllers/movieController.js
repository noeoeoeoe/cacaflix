import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import Swipe from '../entities/swipe.js';

export const getRecommendations = async (req, res) => {
  console.log("on est dans getReco")
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
    .limit(5)
    .getMany()

  res.json(movies);
};

export const getNextRecommendation = async (req, res) => {
  console.log("on est dans getNextReco")
  //const movies = await appDataSource.getRepository(Movie).find();
  const userId = 1;

  //Paramètres de recommandation
  const ProducerCoeff = 3;
  const ActeurCoeff = 1;
  const GenreCoeff = 2;
  const RatioAttiranceRejet = 2; // On recommandera davantage un film similaire à film liké qu'on ne masquera les films similaires à des films dislikés

  //Ne pas recommander les films déjà traités
  const swipedMovieIds = await appDataSource
    .getRepository(Swipe)
    .createQueryBuilder('swipe')
    .where('swipe.userId = :userId', { userId })
    .select('swipe.movieId')
    .getRawMany();

  const movieIds = swipedMovieIds.map((swipe) => swipe.movieId);
  const likedMovieIds = swipedMovieIds.filter((swipe) => swipe.action).map((swipe) => swipe.movieId);
  const dislikedMovieIds = swipedMovieIds.filter((swipe) => !swipe.action).map((swipe) => swipe.movieId);

  // films qui n'ont pas encore été recommandés
  const newMovies = await appDataSource
    .getRepository(Movie)
    .createQueryBuilder('movie')
    .where('movie.id NOT IN (:...movieIds)', { movieIds })// Skip the first 5 movies .skip(5).take(1) 
    .getMany()

  // films déjà proposés à l'utilisateur qui permettent d'obtenir ses gouts
  const likedMovies = await appDataSource
    .getRepository(Movie)
    .createQueryBuilder('movie')
    .where('movie.id IN (:...likedMovieIds)', { likedMovieIds })
    .getMany()

  const dislikedMovies = await appDataSource
    .getRepository(Movie)
    .createQueryBuilder('movie')
    .where('movie.id IN (:...dislikedMovieIds)', { dislikedMovieIds })
    .getMany()

  // Calculer le score de recommandation pour chaque film

  const calculateScore = (movie, likedMovies, dislikedMovies, ProducerCoeff, ActeurCoeff, GenreCoeff, RatioAttiranceRejet) => {
    let score = 0;
  
    // Recommander un film similaire à un film que l'utilisateur aime
    for (const likedMovie of likedMovies) {
      // Compare genres
      const commonGenre = likedMovie.main_genre === movie.main_genre;
      score += commonGenre * GenreCoeff;
  
      // Compare actors
      const commonActor = likedMovie.first_actor === movie.first_actor || likedMovie.second_actor === movie.second_actor || likedMovie.first_actor === movie.second_actor || likedMovie.second_actor === movie.first_actor;
      const commonActors = likedMovie.first_actor === movie.first_actor && likedMovie.second_actor === movie.second_actor
      score += (commonActor + commonActors) * ActeurCoeff;
  
      // Compare producers
      const commonProducer = likedMovie.realisator === movie.realisator;
      score += commonProducer * ProducerCoeff;

      score = score * RatioAttiranceRejet
    }

    // Ne pas recommander un film similaire à un film que n'aime pas l'utilisateur 
    for (const dislikedMovie of dislikedMovies) {
      // Compare genres
      const commonGenre = dislikedMovie.main_genre === movie.main_genre;
      score -= commonGenre * GenreCoeff;
  
      // Compare actors
      const commonActor = dislikedMovie.first_actor === movie.first_actor || dislikedMovie.second_actor === movie.second_actor || dislikedMovie.first_actor === movie.second_actor || dislikedMovie.second_actor === movie.first_actor;
      const commonActors = dislikedMovie.first_actor === movie.first_actor && dislikedMovie.second_actor === movie.second_actor
      score -= (commonActor + commonActors) * ActeurCoeff;
  
      // Compare producers
      const commonProducer = dislikedMovie.realisator === movie.realisator;
      score -= commonProducer * ProducerCoeff;
    }
  
    return score;

  };

  // Calculer le score de recommandation pour chaque film
  newMovies.forEach(movie => {
    movie.score = calculateScore(movie, likedMovies, dislikedMovies, ProducerCoeff, ActeurCoeff, GenreCoeff, RatioAttiranceRejet);
  });

  // Tri des films par score de recommandation
  const recommendedMovies = newMovies.sort((a, b) => b.score - a.score);

  // Retourner les 5 meilleurs films
  const topRecommendedMovie = recommendedMovies[0];

  // Enregistrer le fait qu'on recommande ce film et qu'il va être prochainement swipé (donc ne pas le reproposer)
  const swipeRepository = appDataSource.getRepository(Swipe);
  const newSwipe = swipeRepository.create({
    user: userId,
    movie: topRecommendedMovie.id,
    action: 0,
  });
  await swipeRepository.save(newSwipe);
  res.json(topRecommendedMovie);
  
};

export const handleSwipe = async (req, res) => {
  const { movieId, action } = req.body;
  const userId = 1; // Pas le temps de faire le système d'authentification mais en théorie ce serait req.user.id
  
  const swipeRepository = appDataSource.getRepository(Swipe);
  
  const existingSwipe = await swipeRepository.findOne({
    where: {
      user: userId,
      movie: movieId,
    },
  });

  console.log(existingSwipe);
  if (existingSwipe) {
    // Mettre à jour l'entrée existante
    existingSwipe.action = action;
    await swipeRepository.save(existingSwipe);
    res.status(200).send('Swipe recorded');
  } else {
    // Créer une nouvelle entrée si elle n'existe pas
    const newSwipe = swipeRepository.create({
      user: userId,
      movie: movieId,
      action: action,
    });
    await swipeRepository.save(newSwipe);
    res.status(200).send('Swipe recorded');
  }

}
