import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
//import { PrestamoAlreadyExistsException, UserNotFoundException } from './exceptions/prestamo.exceptions';



@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Post()
  async create(@Body() createPrestamoDto: CreatePrestamoDto) {
    try {
      return await this.prestamosService.create(createPrestamoDto);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error interno del servidor',
          error: 'Internal Server Error',
          code: 'INTERNAL_ERROR'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Get()
  findAll() {
    return this.prestamosService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Get('usuario/:userId')
  async findByUser(@Param('userId') userId: string) {
    try {
      return await this.prestamosService.findByUser(+userId);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error interno del servidor',
          error: 'Internal Server Error',
          code: 'INTERNAL_ERROR'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.prestamosService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error interno del servidor',
          error: 'Internal Server Error',
          code: 'INTERNAL_ERROR'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrestamoDto: UpdatePrestamoDto) {
    return this.prestamosService.update(+id, updatePrestamoDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prestamosService.remove(+id);
  }
}
