import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Libro } from '../libros/entities/libro.entity';
import { Prestamo } from '../prestamos/entities/prestamo.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, // Railway usa esta
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'unibooks',
  entities: [User, Libro, Prestamo],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
