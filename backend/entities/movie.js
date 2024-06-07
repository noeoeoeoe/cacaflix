import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    adult: { type: Boolean, nullable: true },
    poster_path: { type: String, nullable: true },
    popularity: { type: Number, nullable: true },
    overview: { type: String, nullable: true },
    vote_average: { type: Number, nullable: true },
    vote_count: { type: Number, nullable: true },
    original_language: { type: String, nullable: true },
    imdb_id: { type: Number, nullable: true },
    title: { type: String },
    release_date: { type: String, nullable: true },
    realisator: { type: String, nullable: true },
    first_actor: { type: String, nullable: true },
    second_actor: { type: String, nullable: true },
    main_genre: { type: String, nullable: true },
  },
  relations: {
    actors: {
      type: 'many-to-many',
      target: 'Actor',
      joinTable: true,
      cascade: true,
    },
    genres: {
      type: 'many-to-many',
      target: 'Genre',
      joinTable: true,
      cascade: true,
    },
  },
});

export default Movie;
