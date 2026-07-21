import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './responses/user-response.dto';
import { UserMapper } from './mappers/user.mapper';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  private static readonly SALT_ROUNDS = 12;

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const { email, password, fullName } = createUserDto;

    const exists = await this.userRepository.existsByEmail(email);

    if (exists) {
      throw new ConflictException(
        'A user with this email already exists.',
      );
    }

    const passwordHash = await bcrypt.hash(
      password,
      UsersService.SALT_ROUNDS,
    );

    const user = await this.userRepository.create({
      email,
      fullName,
      passwordHash,
    });

    return UserMapper.toResponse(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();

    return UserMapper.toResponseList(users);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return UserMapper.toResponse(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.userRepository.delete(id);
  }
}