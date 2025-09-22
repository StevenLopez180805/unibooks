import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1758511374859 implements MigrationInterface {
    name = 'InitialMigration1758511374859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear enum para roles de usuario
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('bibliotecario', 'estudiante')`);
        
        // Crear tabla de usuarios
        await queryRunner.query(`CREATE TABLE "user" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "email" character varying NOT NULL, 
            "password" character varying NOT NULL, 
            "role" "public"."user_role_enum" NOT NULL, 
            CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), 
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        )`);
        
        // Crear tabla de libros
        await queryRunner.query(`CREATE TABLE "libro" (
            "id" SERIAL NOT NULL, 
            "titulo" character varying NOT NULL, 
            "descripcion" character varying NOT NULL, 
            "escritor" character varying NOT NULL, 
            "ubicacion" character varying NOT NULL, 
            CONSTRAINT "PK_4b0d295c2117f4c4c8b8a8a8a8a" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar tablas
        await queryRunner.query(`DROP TABLE "libro"`);
        await queryRunner.query(`DROP TABLE "user"`);
        
        // Eliminar enum
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }
}
