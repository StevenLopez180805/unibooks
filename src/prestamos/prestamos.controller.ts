import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { PrestamoNotFoundException, PrestamoYaDevueltoException, UserAlreadyHasFivePrestamos, LibroSinStockException } from './exceptions/prestamo.exceptions';
import { UserNotFoundException } from '../users/exceptions/user.exceptions';



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
      if (error instanceof UserAlreadyHasFivePrestamos || 
          error instanceof LibroSinStockException || 
          error instanceof UserNotFoundException) {
        throw error;
      }
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
  @Roles('bibliotecario', 'estudiante')
  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('limit') limit?: string
  ) {
    return this.prestamosService.findAll(
      userId ? +userId : undefined,
      limit ? +limit : undefined
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrestamoDto: UpdatePrestamoDto) {
    return this.prestamosService.update(+id, updatePrestamoDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Patch(':id/devolver')
  async devolverLibro(@Param('id') id: string) {
    try {
      return await this.prestamosService.devolverLibro(+id);
    } catch (error) {
      if (error instanceof PrestamoNotFoundException || 
          error instanceof PrestamoYaDevueltoException) {
        throw error;
      }
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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prestamosService.remove(+id);
  }
}
