import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersAndLibrosAndPrestamosChanges1759811500278 implements MigrationInterface {
    name = 'UsersAndLibrosAndPrestamosChanges1759811500278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestamo" ADD "fechaDevolucionEsperada" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "prestamo" ALTER COLUMN "fechaDevolucion" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestamo" ALTER COLUMN "fechaDevolucion" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "prestamo" DROP COLUMN "fechaDevolucionEsperada"`);
    }

}
