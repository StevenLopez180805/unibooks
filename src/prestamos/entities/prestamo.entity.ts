import { Libro } from '../../libros/entities/libro.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaPrestamo: Date;

  @Column({type: 'date'})
  fechaDevolucionEsperada: Date;

  @Column({ nullable: true, type: 'date' })
  fechaDevolucion: Date;

  @ManyToOne(() => User, (user) => user.prestamos, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Libro, (libro) => libro.prestamos, { onDelete: 'CASCADE' })
  @JoinTable()
  libro: Libro[];
}