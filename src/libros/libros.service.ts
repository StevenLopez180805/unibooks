import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private libroRepository: Repository<Libro>,
  ) {}

  async create(CreateLibroDto: CreateLibroDto) {
    return this.libroRepository.save(CreateLibroDto);
  }

  findAll() {
    return this.libroRepository.find();
  }

  findOne(id: number) {
    return this.libroRepository.findOneBy({ id });
  }

  findByTitulo(titulo: string) {
    return this.libroRepository.findOneBy({ titulo });
  }

  update(id: number, UpdateLibroDto: UpdateLibroDto) {
    return this.libroRepository.update(id, UpdateLibroDto);
  }

  remove(id: number) {
    return this.libroRepository.delete(id);
  }
}
