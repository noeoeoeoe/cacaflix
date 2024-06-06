import { EntitySchema } from 'typeorm';

const Swipe = new EntitySchema({
  name: 'Swipe',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    action: {
      type: Boolean,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
    },
    movie: {
      type: 'many-to-one',
      target: 'Movie',
      joinColumn: true,
    },
  },
});

export default Swipe;
