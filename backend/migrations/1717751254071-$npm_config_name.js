import typeorm from "typeorm";
const { MigrationInterface, QueryRunner } = typeorm;

export default class $npmConfigName1717751254071 {
    name = ' $npmConfigName1717751254071'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "adult" boolean,
                "poster_path" varchar,
                "popularity" integer,
                "overview" varchar,
                "vote_average" integer,
                "vote_count" integer,
                "original_language" varchar,
                "imdb_id" integer,
                "release_date" varchar,
                "realisator" varchar,
                "first_actor" varchar,
                "second_actor" varchar,
                "main_genre" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "title",
                    "adult",
                    "poster_path",
                    "popularity",
                    "overview",
                    "vote_average",
                    "vote_count",
                    "original_language",
                    "imdb_id",
                    "release_date",
                    "realisator",
                    "first_actor",
                    "second_actor",
                    "main_genre"
                )
            SELECT "id",
                "title",
                "adult",
                "poster_path",
                "popularity",
                "overview",
                "vote_average",
                "vote_count",
                "original_language",
                "imdb_id",
                "release_date",
                "realisator",
                "first_actor",
                "second_actor",
                "main_genre"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "adult" boolean,
                "poster_path" varchar,
                "popularity" integer,
                "overview" varchar,
                "vote_average" integer,
                "vote_count" integer,
                "original_language" varchar,
                "imdb_id" integer,
                "release_date" varchar,
                "realisator" varchar,
                "first_actor" varchar,
                "second_actor" varchar,
                "main_genre" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "title",
                    "adult",
                    "poster_path",
                    "popularity",
                    "overview",
                    "vote_average",
                    "vote_count",
                    "original_language",
                    "imdb_id",
                    "release_date",
                    "realisator",
                    "first_actor",
                    "second_actor",
                    "main_genre"
                )
            SELECT "id",
                "title",
                "adult",
                "poster_path",
                "popularity",
                "overview",
                "vote_average",
                "vote_count",
                "original_language",
                "imdb_id",
                "release_date",
                "realisator",
                "first_actor",
                "second_actor",
                "main_genre"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "adult" boolean,
                "poster_path" varchar,
                "popularity" integer,
                "overview" varchar,
                "vote_average" integer,
                "vote_count" integer,
                "original_language" varchar,
                "imdb_id" integer,
                "release_date" varchar,
                "realisator" varchar,
                "first_actor" varchar,
                "second_actor" varchar,
                "main_genre" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "title",
                    "adult",
                    "poster_path",
                    "popularity",
                    "overview",
                    "vote_average",
                    "vote_count",
                    "original_language",
                    "imdb_id",
                    "release_date",
                    "realisator",
                    "first_actor",
                    "second_actor",
                    "main_genre"
                )
            SELECT "id",
                "title",
                "adult",
                "poster_path",
                "popularity",
                "overview",
                "vote_average",
                "vote_count",
                "original_language",
                "imdb_id",
                "release_date",
                "realisator",
                "first_actor",
                "second_actor",
                "main_genre"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "adult" boolean,
                "poster_path" varchar,
                "popularity" integer,
                "overview" varchar,
                "vote_average" integer,
                "vote_count" integer,
                "original_language" varchar,
                "imdb_id" integer,
                "release_date" varchar,
                "realisator" varchar,
                "first_actor" varchar,
                "second_actor" varchar,
                "main_genre" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "title",
                    "adult",
                    "poster_path",
                    "popularity",
                    "overview",
                    "vote_average",
                    "vote_count",
                    "original_language",
                    "imdb_id",
                    "release_date",
                    "realisator",
                    "first_actor",
                    "second_actor",
                    "main_genre"
                )
            SELECT "id",
                "title",
                "adult",
                "poster_path",
                "popularity",
                "overview",
                "vote_average",
                "vote_count",
                "original_language",
                "imdb_id",
                "release_date",
                "realisator",
                "first_actor",
                "second_actor",
                "main_genre"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
