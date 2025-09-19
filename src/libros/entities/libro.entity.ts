import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  escritor: string;

  @Column()
  ubicacion: string;

}