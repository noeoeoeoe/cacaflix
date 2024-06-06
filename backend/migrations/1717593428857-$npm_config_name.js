import typeorm from "typeorm";
const { MigrationInterface, QueryRunner } = typeorm;

export default class $npmConfigName1717593428857 {
    name = ' $npmConfigName1717593428857'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "actor" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_actors_actor" (
                "movieId" integer NOT NULL,
                "actorId" integer NOT NULL,
                PRIMARY KEY ("movieId", "actorId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_992f9af300d8c96c46fea4e541" ON "movie_actors_actor" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId")
        `);
        await queryRunner.query(`
            CREATE TABLE "actor_movies_movie" (
                "actorId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("actorId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_48fa78b2634b01bf58ad1686ef" ON "actor_movies_movie" ("actorId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_45708bd514560bac8a3a54470d" ON "actor_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_992f9af300d8c96c46fea4e541"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_65be8ded67af2677acfd19854c"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_actors_actor" (
                "movieId" integer NOT NULL,
                "actorId" integer NOT NULL,
                CONSTRAINT "FK_992f9af300d8c96c46fea4e5419" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_65be8ded67af2677acfd19854c2" FOREIGN KEY ("actorId") REFERENCES "actor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("movieId", "actorId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_actors_actor"("movieId", "actorId")
            SELECT "movieId",
                "actorId"
            FROM "movie_actors_actor"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_actors_actor"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie_actors_actor"
                RENAME TO "movie_actors_actor"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_992f9af300d8c96c46fea4e541" ON "movie_actors_actor" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_48fa78b2634b01bf58ad1686ef"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_45708bd514560bac8a3a54470d"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_actor_movies_movie" (
                "actorId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_48fa78b2634b01bf58ad1686ef5" FOREIGN KEY ("actorId") REFERENCES "actor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_45708bd514560bac8a3a54470d5" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("actorId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_actor_movies_movie"("actorId", "movieId")
            SELECT "actorId",
                "movieId"
            FROM "actor_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "actor_movies_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_actor_movies_movie"
                RENAME TO "actor_movies_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_48fa78b2634b01bf58ad1686ef" ON "actor_movies_movie" ("actorId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_45708bd514560bac8a3a54470d" ON "actor_movies_movie" ("movieId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_45708bd514560bac8a3a54470d"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_48fa78b2634b01bf58ad1686ef"
        `);
        await queryRunner.query(`
            ALTER TABLE "actor_movies_movie"
                RENAME TO "temporary_actor_movies_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "actor_movies_movie" (
                "actorId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("actorId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "actor_movies_movie"("actorId", "movieId")
            SELECT "actorId",
                "movieId"
            FROM "temporary_actor_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_actor_movies_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_45708bd514560bac8a3a54470d" ON "actor_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_48fa78b2634b01bf58ad1686ef" ON "actor_movies_movie" ("actorId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_65be8ded67af2677acfd19854c"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_992f9af300d8c96c46fea4e541"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_actors_actor"
                RENAME TO "temporary_movie_actors_actor"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_actors_actor" (
                "movieId" integer NOT NULL,
                "actorId" integer NOT NULL,
                PRIMARY KEY ("movieId", "actorId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_actors_actor"("movieId", "actorId")
            SELECT "movieId",
                "actorId"
            FROM "temporary_movie_actors_actor"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_actors_actor"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_992f9af300d8c96c46fea4e541" ON "movie_actors_actor" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_45708bd514560bac8a3a54470d"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_48fa78b2634b01bf58ad1686ef"
        `);
        await queryRunner.query(`
            DROP TABLE "actor_movies_movie"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_65be8ded67af2677acfd19854c"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_992f9af300d8c96c46fea4e541"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_actors_actor"
        `);
        await queryRunner.query(`
            DROP TABLE "actor"
        `);
    }
}
