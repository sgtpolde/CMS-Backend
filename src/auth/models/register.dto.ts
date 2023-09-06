import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/roles/models/role.entity';

export class RegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  password_confirm: string;

  roles: Role[];
}
