import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
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
  @IsNotEmpty()
  password: string;
}
