import { Prestamo } from '../../prestamos/entities/prestamo.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

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

  @Column()
  stock: number;

  @ManyToMany(() => Prestamo, (prestamo) => prestamo.libro)
  prestamos: Prestamo[];
}