import { appDataSource } from '../datasource.js';
import Swipe from '../entities/swipe.js';
import Movie from '../entities/movie.js';


const clearTable = async () => {
    try {
      await appDataSource.initialize();
      const swipeRepository = appDataSource.getRepository(Swipe);
      const movieRepository = appDataSource.getRepository(Movie);
      
      // Supprimer toutes les entrées de la table swipe
      await swipeRepository.clear();
      await movieRepository.clear();
  
      console.log('Table swipe vidée avec succès.');
    } catch (error) {
      console.error('Erreur lors du vidage de la table swipe :', error);
    } finally {
      await appDataSource.destroy();
    }
  };
  
  clearTable();