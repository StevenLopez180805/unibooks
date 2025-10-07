import { Prestamo } from '../../prestamos/entities/prestamo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum UserRole {
  bibliotecario = 'bibliotecario',
  estudiante = 'estudiante',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  secondName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  secondLastName: string;

  @Column({ unique: true })
  cedula: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole
  })
  role: UserRole;

  @OneToMany(() => Prestamo, (prestamo) => prestamo.user)
  prestamos: Prestamo[];

}