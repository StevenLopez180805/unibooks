import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CedulaAlreadyExistsException, EmailAlreadyExistsException, UserNotFoundException } from './exceptions/user.exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Verificar si el email ya existe
    const existingUser = await this.usersRepository.findOne({
      where: [{ email: createUserDto.email }, { cedula: createUserDto.cedula }],
    });
    
    if (existingUser) {
      if (existingUser.email === createUserDto.email)
        throw new EmailAlreadyExistsException(createUserDto.email);
    
      if (existingUser.cedula === createUserDto.cedula)
        throw new CedulaAlreadyExistsException(createUserDto.cedula);
    }


    const hashedPass = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPass,
    });
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Verificar si el usuario existe
    const existingUser = await this.usersRepository.findOneBy({ id });
    if (!existingUser) {
      throw new UserNotFoundException(id);
    }

    // Verificar si el email o cédula ya existen en otros usuarios
    if (updateUserDto.email || updateUserDto.cedula) {
      const whereConditions: any[] = [];
      
      if (updateUserDto.email) {
        whereConditions.push({ email: updateUserDto.email });
      }
      
      if (updateUserDto.cedula) {
        whereConditions.push({ cedula: updateUserDto.cedula });
      }

      const userWithSameData = await this.usersRepository.findOne({
        where: whereConditions,
      });

      if (userWithSameData && userWithSameData.id !== id) {
        if (updateUserDto.email && userWithSameData.email === updateUserDto.email) {
          throw new EmailAlreadyExistsException(updateUserDto.email);
        }
        
        if (updateUserDto.cedula && userWithSameData.cedula === updateUserDto.cedula) {
          throw new CedulaAlreadyExistsException(updateUserDto.cedula);
        }
      }
    }

    // Si se está actualizando la contraseña, hashearla
    let updateData = { ...updateUserDto };
    if (updateUserDto.password && updateUserDto.password !== '') {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.usersRepository.update(id, updateData);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.usersRepository.softDelete(id);
  }

  // Método para restaurar un usuario eliminado (soft delete)
  async restore(id: number) {
    return this.usersRepository.restore(id);
  }

  // Método para obtener usuarios incluyendo los eliminados
  findAllWithDeleted() {
    return this.usersRepository.find({ withDeleted: true });
  }

  // Método para obtener solo los usuarios eliminados
  findDeleted() {
    return this.usersRepository.find({ 
      withDeleted: true, 
      where: { deletedAt: Not(null) } as any 
    });
  }
}
