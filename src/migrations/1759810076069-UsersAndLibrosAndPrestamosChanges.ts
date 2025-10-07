import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersAndLibrosAndPrestamosChanges1759810076069 implements MigrationInterface {
    name = 'UsersAndLibrosAndPrestamosChanges1759810076069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prestamo_libro_libro" ("prestamoId" integer NOT NULL, "libroId" integer NOT NULL, CONSTRAINT "PK_8c5dc0ec2930421937df646f771" PRIMARY KEY ("prestamoId", "libroId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_08cc0eb764e2a487d91cdc32a6" ON "prestamo_libro_libro" ("prestamoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5457bb0787127cc97554c96211" ON "prestamo_libro_libro" ("libroId") `);
        await queryRunner.query(`ALTER TABLE "prestamo" DROP COLUMN "fechaPrestamo"`);
        await queryRunner.query(`ALTER TABLE "prestamo" ADD "fechaPrestamo" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "prestamo" DROP COLUMN "fechaDevolucion"`);
        await queryRunner.query(`ALTER TABLE "prestamo" ADD "fechaDevolucion" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firstName" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "secondName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "secondName" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastName" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "secondLastName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "secondLastName" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_d8b21b5b28ac133973b9c611b14" UNIQUE ("cedula")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "cedula" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "prestamo_libro_libro" ADD CONSTRAINT "FK_08cc0eb764e2a487d91cdc32a6b" FOREIGN KEY ("prestamoId") REFERENCES "prestamo"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "prestamo_libro_libro" ADD CONSTRAINT "FK_5457bb0787127cc97554c96211e" FOREIGN KEY ("libroId") REFERENCES "libro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestamo_libro_libro" DROP CONSTRAINT "FK_5457bb0787127cc97554c96211e"`);
        await queryRunner.query(`ALTER TABLE "prestamo_libro_libro" DROP CONSTRAINT "FK_08cc0eb764e2a487d91cdc32a6b"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "cedula" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_d8b21b5b28ac133973b9c611b14"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "secondLastName" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "secondLastName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastName" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "secondName" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "secondName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firstName" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "prestamo" DROP COLUMN "fechaDevolucion"`);
        await queryRunner.query(`ALTER TABLE "prestamo" ADD "fechaDevolucion" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "prestamo" DROP COLUMN "fechaPrestamo"`);
        await queryRunner.query(`ALTER TABLE "prestamo" ADD "fechaPrestamo" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5457bb0787127cc97554c96211"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08cc0eb764e2a487d91cdc32a6"`);
        await queryRunner.query(`DROP TABLE "prestamo_libro_libro"`);
    }

}
