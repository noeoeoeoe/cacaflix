import { appDataSource } from '../datasource.js';
import Swipe from '../entities/swipe.js';


const clearSwipeTable = async () => {
    try {
      await appDataSource.initialize();
      const swipeRepository = appDataSource.getRepository(Swipe);
      
      // Supprimer toutes les entrées de la table swipe
      await swipeRepository.clear();
  
      console.log('Table swipe vidée avec succès.');
    } catch (error) {
      console.error('Erreur lors du vidage de la table swipe :', error);
    } finally {
      await appDataSource.destroy();
    }
  };
  
  clearSwipeTable();