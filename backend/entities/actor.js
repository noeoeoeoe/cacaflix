import typeorm from 'typeorm';

const Actor = new typeorm.EntitySchema({
  name: 'Actor',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
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

export default Actor;
