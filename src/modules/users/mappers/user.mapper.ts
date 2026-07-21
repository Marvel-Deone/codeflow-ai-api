
import { User } from 'generated/prisma/client';
import { UserResponseDto } from '../responses/user-response.dto';

export class UserMapper {
  /**
   * Maps a Prisma User entity to a UserResponseDto.
   */
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Maps multiple Prisma User entities to UserResponseDto[].
   */
  static toResponseList(users: User[]): UserResponseDto[] {
    return users.map(UserMapper.toResponse);
  }
}