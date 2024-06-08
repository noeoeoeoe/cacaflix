import React from 'react';
import TinderCard from 'react-tinder-card';
import './MovieCard.css';

const MovieCard = ({ movie, onSwipe }) => {
  
  const handleSwipe = (direction) => {
    onSwipe(direction, movie);
  };

  return (
    <TinderCard
      onSwipe={(dir) => handleSwipe(dir)}
      preventSwipe={['up', 'down']}
    >
      <div className="card">
        <h3>{movie.title} - Note : {movie.vote_average}/10</h3> 
        <p>{movie.release_date}</p>
        <p>{movie.overview}</p>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} draggable="false"/>
      </div>
    </TinderCard>
  );
};

export default MovieCard;
