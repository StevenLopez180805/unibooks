import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  bibliotecario = 'bibliotecario',
  estudiante = 'estudiante',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole
  })
  role: UserRole;

}