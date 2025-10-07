import { User } from "src/users/entities/user.entity";
import { Libro } from "src/libros/entities/libro.entity";

export class CreatePrestamoDto {
  fechaPrestamo: Date;
  fechaDevolucionEsperada: Date;
  fechaDevolucion?: Date;
  user: User;
  libro: Libro[];
}
