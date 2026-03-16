import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateArticleFields1760561033129 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
