import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateArticleFields1760561033129 implements MigrationInterface {
    name = 'UpdateArticleFields1760561033129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remplacer les NULL par des chaînes vides
        await queryRunner.query(`UPDATE "articles" SET "title" = '' WHERE "title" IS NULL`);
        await queryRunner.query(`UPDATE "articles" SET "head" = '' WHERE "head" IS NULL`);

        // Modifier les colonnes en varchar(2000) et mettre NOT NULL
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" TYPE character varying(2000)`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" SET NOT NULL`);

        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "head" TYPE character varying(2000)`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "head" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revenir aux anciennes tailles
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" TYPE character varying(255)`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "head" TYPE character varying(255)`);
    }
}
