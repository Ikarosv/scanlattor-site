import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enums';

export class CreateUserDto {
  @IsString({
    message: 'O nome deve ser um texto',
  })
  @MinLength(3, {
    message: 'O nome deve ter pelo menos 3 caracteres',
  })
  name: string;

  @IsEmail({}, { message: 'Digite um email válido' })
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve conter pelo menos 6 caracteres, 1 letra maiúscula, 1 letra minúscula, 2 números e 1 símbolo',
    },
  )
  password: string;
}
