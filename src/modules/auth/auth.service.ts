import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '@prisma/client';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from '../users/repositories/user.repository';
import { UserResponseDto } from '../users/responses/user-response.dto';
import { UserMapper } from '../users/mappers/user.mapper';


@Injectable()
export class AuthService {
  private static readonly SALT_ROUNDS = 12;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   */
  async register(registerDto: RegisterDto): Promise<{
    user: UserResponseDto;
    accessToken: string;
  }> {
    const { fullName, email, password } = registerDto;

    const exists = await this.userRepository.existsByEmail(email);

    if (exists) {
      throw new ConflictException(
        'A user with this email already exists.',
      );
    }

    const passwordHash = await bcrypt.hash(
      password,
      AuthService.SALT_ROUNDS,
    );

    const user = await this.userRepository.create({
      fullName,
      email,
      passwordHash,
    });

    const accessToken = await this.generateAccessToken(user);

    return {
      user: UserMapper.toResponse(user),
      accessToken,
    };
  }

  /**
   * Login an existing user
   */
  async login(loginDto: LoginDto): Promise<{
    user: UserResponseDto;
    accessToken: string;
  }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const accessToken = await this.generateAccessToken(user);

    return {
      user: UserMapper.toResponse(user),
      accessToken,
    };
  }

  /**
   * Generate JWT access token
   */
  private async generateAccessToken(
    user: User,
  ): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.signAsync(payload);
  }
}