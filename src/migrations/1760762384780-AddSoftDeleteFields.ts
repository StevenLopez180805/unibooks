import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDeleteFields1760762384780 implements MigrationInterface {
    name = 'AddSoftDeleteFields1760762384780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "libro" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "libro" DROP COLUMN "deletedAt"`);
    }

}
