import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';


@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Post()
  create(@Body() CreateLibroDto: CreateLibroDto) {
    return this.librosService.create(CreateLibroDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario', 'estudiante')
  @Get()
  findAll() {
    return this.librosService.findAll();
  }
  
}
