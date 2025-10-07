import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { Prestamo } from './entities/prestamo.entity';
import { User } from 'src/users/entities/user.entity';
import { Libro } from 'src/libros/entities/libro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prestamo, User, Libro])],
  controllers: [PrestamosController],
  providers: [PrestamosService],
  exports: [PrestamosService],
})
export class PrestamosModule {}
