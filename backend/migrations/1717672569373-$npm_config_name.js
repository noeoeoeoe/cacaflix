import typeorm from "typeorm";
const { MigrationInterface, QueryRunner } = typeorm;

export default class $npmConfigName1717672569373 {
    name = ' $npmConfigName1717672569373'

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
        await queryRunner.query(`
            CREATE TABLE "swipe" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "action" boolean NOT NULL,
                "userId" integer,
                "movieId" integer
            )
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
        await queryRunner.query(`
            CREATE TABLE "temporary_swipe" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "action" boolean NOT NULL,
                "userId" integer,
                "movieId" integer,
                CONSTRAINT "FK_68cab0b70b0bb4cd0139225cca4" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_700052faade9ea22f32605402db" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_swipe"("id", "action", "userId", "movieId")
            SELECT "id",
                "action",
                "userId",
                "movieId"
            FROM "swipe"
        `);
        await queryRunner.query(`
            DROP TABLE "swipe"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_swipe"
                RENAME TO "swipe"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "swipe"
                RENAME TO "temporary_swipe"
        `);
        await queryRunner.query(`
            CREATE TABLE "swipe" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "action" boolean NOT NULL,
                "userId" integer,
                "movieId" integer
            )
        `);
        await queryRunner.query(`
            INSERT INTO "swipe"("id", "action", "userId", "movieId")
            SELECT "id",
                "action",
                "userId",
                "movieId"
            FROM "temporary_swipe"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_swipe"
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
        await queryRunner.query(`
            DROP TABLE "swipe"
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
