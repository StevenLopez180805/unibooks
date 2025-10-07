import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  cedula: string;
  email: string;
  password: string;
  role: UserRole;
}
