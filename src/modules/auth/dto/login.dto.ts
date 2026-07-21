import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty({
    example: 'john@example.com',
  })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password@123',
  })
  @IsString()
  password!: string;
}