import { DataSource } from 'typeorm';
import Movie from './entities/movie.js';
import Actor from './entities/actor.js';
import Genre from './entities/genre.js';
import Swipe from './entities/swipe.js';
import User from './entities/user.js';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [Movie, Actor, Genre, Swipe, User],
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
});
