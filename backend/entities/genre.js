import typeorm from 'typeorm';

const Genre = new typeorm.EntitySchema({
  name: 'Genre',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    imdb_id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
    },
  },
  relations: {
    movies: {
      type: 'many-to-many',
      target: 'Movie',
      joinTable: true,
      cascade: true,
    },
  },
});

export default Genre;
