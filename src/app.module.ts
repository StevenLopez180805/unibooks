import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LibrosModule } from './libros/libros.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        
        return {
          type: 'postgres',
          ...(databaseUrl ? { url: databaseUrl } : {
            host: config.get<string>('DATABASE_HOST'),
            port: config.get<number>('DATABASE_PORT'),
            username: config.get<string>('DATABASE_USERNAME'),
            password: config.get<string>('DATABASE_PASSWORD'),
            database: config.get<string>('DATABASE_NAME'),
          }),
          autoLoadEntities: true,
          synchronize: false, // Siempre deshabilitado para usar migraciones
          migrations: ['dist/migrations/*.js'],
          migrationsRun: true, // Ejecutar migraciones automáticamente al iniciar
          logging: config.get<string>('NODE_ENV') === 'development',
        };
      },
    }),
    UsersModule,
    AuthModule,
    LibrosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
