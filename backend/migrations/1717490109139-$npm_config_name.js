import typeorm from "typeorm";
const { MigrationInterface, QueryRunner } = typeorm;


export default class AddMovieTable1717490109139 {
    name = ' $npmConfigName1717490109139'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" varchar NOT NULL
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
