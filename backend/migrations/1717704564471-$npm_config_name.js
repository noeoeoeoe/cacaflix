import typeorm from "typeorm";
const { MigrationInterface, QueryRunner } = typeorm;

export default class $npmConfigName1717704564471 {
    name = ' $npmConfigName1717704564471'

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
            CREATE TABLE "movie_genres_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId")
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
            DROP INDEX "IDX_985216b45541c7e0ec644a8dd4"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_1996ce31a9e067304ab168d671"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_genres_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_1996ce31a9e067304ab168d6715" FOREIGN KEY ("genreId") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_genres_genre"("movieId", "genreId")
            SELECT "movieId",
                "genreId"
            FROM "movie_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_genres_genre"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie_genres_genre"
                RENAME TO "movie_genres_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_1996ce31a9e067304ab168d671"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_985216b45541c7e0ec644a8dd4"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_genres_genre"
                RENAME TO "temporary_movie_genres_genre"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_genres_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_genres_genre"("movieId", "genreId")
            SELECT "movieId",
                "genreId"
            FROM "temporary_movie_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_genres_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId")
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
            DROP INDEX "IDX_1996ce31a9e067304ab168d671"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_985216b45541c7e0ec644a8dd4"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_genres_genre"
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
