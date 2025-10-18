import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { UserAlreadyHasFivePrestamos, PrestamoNotFoundException, LibroSinStockException, PrestamoYaDevueltoException } from './exceptions/prestamo.exceptions';
import { Prestamo } from './entities/prestamo.entity';
import { User } from 'src/users/entities/user.entity';
import { Libro } from 'src/libros/entities/libro.entity';
import { UserNotFoundException } from 'src/users/exceptions/user.exceptions';

@Injectable()
export class PrestamosService {
  constructor(
    @InjectRepository(Prestamo)
    private prestamosRepository: Repository<Prestamo>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Libro)
    private librosRepository: Repository<Libro>,
  ) {}

  async create(createPrestamoDto: CreatePrestamoDto) {
    // Buscar el usuario con sus préstamos para validar
    const user = await this.usersRepository.findOne({
      where: { id: createPrestamoDto.user.id },
      relations: ['prestamos']
    });
    
    if (!user) {
      throw new UserNotFoundException(createPrestamoDto.user.id);
    }
    
    // Verificar si el usuario ya tiene 5 préstamos
    if (user.prestamos.length >= 5) {
      throw new UserAlreadyHasFivePrestamos(user.id.toString());
    }
    
    // Validar stock de cada libro
    const librosParaPrestar: Libro[] = [];
    for (const libro of createPrestamoDto.libro) {
      const libroEncontrado = await this.librosRepository.findOneBy({ id: libro.id });
      
      if (!libroEncontrado) {
        throw new Error(`Libro con ID ${libro.id} no encontrado`);
      }
      
      // Verificar si hay stock disponible
      if (libroEncontrado.stock <= 0) {
        throw new LibroSinStockException(libroEncontrado.titulo);
      }
      
      librosParaPrestar.push(libroEncontrado);
    }
    
    // Crear el nuevo préstamo
    const prestamo = this.prestamosRepository.create({
      fechaPrestamo: createPrestamoDto.fechaPrestamo,
      fechaDevolucion: createPrestamoDto.fechaDevolucion,
      fechaDevolucionEsperada: createPrestamoDto.fechaDevolucionEsperada,
      user: user,
      libro: librosParaPrestar
    });
    
    // Guardar el préstamo en la base de datos
    const prestamoGuardado = await this.prestamosRepository.save(prestamo);
    
    // Actualizar el stock de cada libro (restar 1)
    for (const libro of librosParaPrestar) {
      // Obtener el libro actualizado para asegurar que tenemos el stock correcto
      const libroActualizado = await this.librosRepository.findOneBy({ id: libro.id });
      if (libroActualizado) {
        await this.librosRepository.update(libro.id, {
          stock: libroActualizado.stock - 1
        });
      }
    }
    
    return prestamoGuardado;
  }

  findAll() {
    return this.prestamosRepository.find({
      relations: ['user', 'libro']
    });
  }

  async findByUser(userId: number) {
    // Verificar que el usuario existe
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    // Buscar todos los préstamos del usuario con sus relaciones
    return await this.prestamosRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'libro']
    });
  }

  async findOne(id: number) {
    const prestamo = await this.prestamosRepository.findOneBy({ id });
    if (!prestamo) {
      throw new PrestamoNotFoundException(id);
    }
    return prestamo;
  }

  update(id: number, UpdatePrestamoDto: UpdatePrestamoDto) {
    return this.prestamosRepository.update(id, UpdatePrestamoDto);
  }

  async devolverLibro(id: number) {
    // Buscar el préstamo con sus libros
    const prestamo = await this.prestamosRepository.findOne({
      where: { id },
      relations: ['libro']
    });

    if (!prestamo) {
      throw new PrestamoNotFoundException(id);
    }

    // Verificar si ya fue devuelto
    if (prestamo.fechaDevolucion) {
      throw new PrestamoYaDevueltoException(id);
    }

    // Actualizar la fecha de devolución
    await this.prestamosRepository.update(id, {
      fechaDevolucion: new Date()
    });

    // Incrementar el stock de cada libro al devolver
    for (const libro of prestamo.libro) {
      // Obtener el libro actualizado para asegurar que tenemos el stock correcto
      const libroActualizado = await this.librosRepository.findOneBy({ id: libro.id });
      if (libroActualizado) {
        await this.librosRepository.update(libro.id, {
          stock: libroActualizado.stock + 1
        });
      }
    }

    // Retornar el préstamo actualizado
    return this.findOne(id);
  }

  async remove(id: number) {
    // Buscar el préstamo con sus libros antes de eliminarlo
    const prestamo = await this.prestamosRepository.findOne({
      where: { id },
      relations: ['libro']
    });

    if (!prestamo) {
      throw new PrestamoNotFoundException(id);
    }

    // Incrementar el stock de cada libro al devolver
    for (const libro of prestamo.libro) {
      // Obtener el libro actualizado para asegurar que tenemos el stock correcto
      const libroActualizado = await this.librosRepository.findOneBy({ id: libro.id });
      if (libroActualizado) {
        await this.librosRepository.update(libro.id, {
          stock: libroActualizado.stock + 1
        });
      }
    }

    // Eliminar el préstamo
    return this.prestamosRepository.delete(id);
  }
}