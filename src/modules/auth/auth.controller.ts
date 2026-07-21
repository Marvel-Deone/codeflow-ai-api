import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';


import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
// import { SuccessMessage } from 'src/common/decorators/success-message.decorator';
import { SuccessMessage } from '../../../src/common/decorators/success-message.decorator';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  @SuccessMessage('User registered successfully.')
  @ApiOperation({
    summary: 'Register a new user',
  })
  async register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @SuccessMessage('User logged in successfully.')
  @ApiOperation({
    summary: 'Authenticate a user',
  })
  async login(
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @SuccessMessage('Profile retrieved successfully.')
  @ApiOperation({
    summary: 'Get authenticated user profile',
  })
  @ApiOkResponse({
    description: 'Authenticated user profile.',
  })
  async profile(
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return user;
  }
}

// Local minimal type for the authenticated user
interface AuthenticatedUser {
  id: number | string;
  email: string;
  name?: string;
  [key: string]: any;
}