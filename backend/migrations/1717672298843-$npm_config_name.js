import typeorm from "typeorm";
const { MigrationInterface, QueryRunner } = typeorm;

export default class $npmConfigName1717672298843 {
    name = ' $npmConfigName1717672298843'

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
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
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
                    "release_date"
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
                "release_date"
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
                "adult" boolean NOT NULL DEFAULT (0),
                "poster_path" varchar,
                "popularity" integer,
                "overview" varchar,
                "vote_average" integer,
                "vote_count" integer,
                "original_language" varchar,
                "imdb_id" integer,
                "release_date" varchar,
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
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
                    "release_date"
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
                "release_date"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
