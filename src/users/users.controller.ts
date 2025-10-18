import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CedulaAlreadyExistsException, EmailAlreadyExistsException, UserNotFoundException } from './exceptions/user.exceptions';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsException || error instanceof CedulaAlreadyExistsException) {
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
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(+id);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
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
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsException || 
          error instanceof CedulaAlreadyExistsException || 
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
  @Roles('bibliotecario')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // Endpoints adicionales para soft delete
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Post(':id/restore')
  restore(@Param('id') id: string) {
    return this.usersService.restore(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Get('admin/all')
  findAllWithDeleted() {
    return this.usersService.findAllWithDeleted();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('bibliotecario')
  @Get('admin/deleted')
  findDeleted() {
    return this.usersService.findDeleted();
  }
}
