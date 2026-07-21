import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user.',
    minLength: 2,
    maxLength: 100,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(2, 100)
  fullName!: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user.',
  })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'MySecurePassword@123',
    description:
      'The user password. Must contain uppercase, lowercase, number and special character.',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MaxLength(128)
  password!: string;
}