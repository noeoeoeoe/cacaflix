import React from 'react';
import TinderCard from 'react-tinder-card';

const MovieCard = ({ movie, onSwipe }) => {
  const handleSwipe = (direction) => {
    onSwipe(direction, movie);
  };

  return (
    <TinderCard
      onSwipe={(dir) => handleSwipe(dir)}
      preventSwipe={['up', 'down']}
    >
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
        }}
        className="card"
      >
        <h3>{movie.title}</h3>
      </div>
    </TinderCard>
  );
};

export default MovieCard;
