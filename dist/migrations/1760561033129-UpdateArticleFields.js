"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticleFields1760561033129 = void 0;
class UpdateArticleFields1760561033129 {
    constructor() {
        this.name = 'UpdateArticleFields1760561033129';
    }
    async up(queryRunner) {
        await queryRunner.query(`UPDATE "articles" SET "title" = '' WHERE "title" IS NULL`);
        await queryRunner.query(`UPDATE "articles" SET "head" = '' WHERE "head" IS NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" TYPE character varying(2000)`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "head" TYPE character varying(2000)`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "head" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" TYPE character varying(255)`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "head" TYPE character varying(255)`);
    }
}
exports.UpdateArticleFields1760561033129 = UpdateArticleFields1760561033129;
//# sourceMappingURL=1760561033129-UpdateArticleFields.js.map