import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyHasFivePrestamos extends HttpException {
  constructor(user: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `El usuario '${user}' ya tiene 5 prestamos`,
        error: 'Conflict',
        code: 'USER_ALREADY_HAS_FIVE_PRESTAMOS'
      },
      HttpStatus.CONFLICT
    );
  }
}

export class PrestamoNotFoundException extends HttpException {
  constructor(id: number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Prestamo con ID ${id} no encontrado`,
        error: 'Not Found',
        code: 'PRESTAMO_NOT_FOUND'
      },
      HttpStatus.NOT_FOUND
    );
  }
}

export class LibroSinStockException extends HttpException {
  constructor(libroTitulo: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `El libro '${libroTitulo}' no tiene stock disponible`,
        error: 'Bad Request',
        code: 'LIBRO_SIN_STOCK'
      },
      HttpStatus.BAD_REQUEST
    );
  }
}