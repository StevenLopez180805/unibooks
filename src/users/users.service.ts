import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
