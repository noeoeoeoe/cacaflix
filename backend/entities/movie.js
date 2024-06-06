import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    adult: { type: Boolean },
    poster_path: { type: String },
    popularity: { type: Number },
    overview: { type: String },
    vote_average: { type: Number },
    vote_count: { type: Number },
    original_language: { type: String },
    imdb_id: { type: Number },
    title: {
      type: String,
      unique: true,
    },
    release_date: { type: String },
  },
  relations: {
    actors: {
      type: 'many-to-many',
      target: 'Actor',
      joinTable: true,
      cascade: true,
    },
  },
});

export default Movie;
