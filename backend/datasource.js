import { DataSource } from 'typeorm';
import Movie from './entities/movie.js';
import Actor from './entities/actor.js';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [Movie, Actor],
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
});
