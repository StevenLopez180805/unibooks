import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `El email '${email}' ya está registrado`,
        error: 'Conflict',
        code: 'EMAIL_ALREADY_EXISTS'
      },
      HttpStatus.CONFLICT
    );
  }
}

export class CedulaAlreadyExistsException extends HttpException {
  constructor(cedula: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `Ya existe un usuario con cédula '${cedula}' registrado`,
        error: 'Conflict',
        code: 'CEDULA_ALREADY_EXISTS'
      },
      HttpStatus.CONFLICT
    );
  }
}

export class UserNotFoundException extends HttpException {
  constructor(id: number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Usuario con ID ${id} no encontrado`,
        error: 'Not Found',
        code: 'USER_NOT_FOUND'
      },
      HttpStatus.NOT_FOUND
    );
  }
}
