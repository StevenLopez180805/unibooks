import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1759801380040 implements MigrationInterface {
    name = 'UpdateUserTable1759801380040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "secondName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "secondLastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cedula" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cedula"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "secondLastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "secondName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
    }

}
