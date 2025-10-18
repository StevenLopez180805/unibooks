import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';


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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario', 'estudiante')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.librosService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibroDto: UpdateLibroDto) {
    return this.librosService.update(+id, updateLibroDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.librosService.remove(+id);
  }

  // Endpoints adicionales para soft delete
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Post(':id/restore')
  restore(@Param('id') id: string) {
    return this.librosService.restore(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Get('admin/all')
  findAllWithDeleted() {
    return this.librosService.findAllWithDeleted();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Get('admin/deleted')
  findDeleted() {
    return this.librosService.findDeleted();
  }
}
