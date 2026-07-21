import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma/enums';

export class UserResponseDto {
  @ApiProperty({
    example: 'cmel5zqg50000n1m8f9z3k2ab',
    description: 'Unique identifier of the user.',
  })
  id!: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user.',
  })
  fullName!: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user.',
  })
  email!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'Role assigned to the user.',
  })
  role!: UserRole;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user account is active.',
  })
  isActive!: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the user has verified their email.',
  })
  emailVerified!: boolean;

  @ApiProperty({
    example: '2026-07-20T14:30:00.000Z',
    description: 'Date the user account was created.',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-07-20T15:45:00.000Z',
    description: 'Date the user account was last updated.',
  })
  updatedAt!: Date;
}