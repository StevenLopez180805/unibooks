import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersAndLibrosChangeAndPrestamosCreation1759809289922 implements MigrationInterface {
    name = 'UsersAndLibrosChangeAndPrestamosCreation1759809289922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prestamo" ("id" SERIAL NOT NULL, "fechaPrestamo" TIMESTAMP NOT NULL, "fechaDevolucion" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_f278f946a735410406b7d965b2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "libro" ADD "stock" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "prestamo" ADD CONSTRAINT "FK_8c0a11027eed9e93d6d1a5f76df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestamo" DROP CONSTRAINT "FK_8c0a11027eed9e93d6d1a5f76df"`);
        await queryRunner.query(`ALTER TABLE "libro" DROP COLUMN "stock"`);
        await queryRunner.query(`DROP TABLE "prestamo"`);
    }

}
