import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Libro } from '../libros/entities/libro.entity';

// Cargar variables de entorno
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'), // Para Railway
  host: configService.get<string>('DATABASE_HOST', 'localhost'),
  port: configService.get<number>('DATABASE_PORT', 5432),
  username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
  password: configService.get<string>('DATABASE_PASSWORD', 'password'),
  database: configService.get<string>('DATABASE_NAME', 'unibooks'),
  entities: [User, Libro],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
