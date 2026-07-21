import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

// import { SuccessMessage } from '@/common/decorators/success-message.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './responses/user-response.dto';
import { UsersService } from './users.service';
import { SuccessMessage } from 'src/common/decorators/success-message.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @SuccessMessage('User created successfully.')
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiCreatedResponse({
    description: 'User created successfully.',
    type: UserResponseDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @SuccessMessage('Users retrieved successfully.')
  @ApiOperation({
    summary: 'Retrieve all users',
  })
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @SuccessMessage('User retrieved successfully.')
  @ApiOperation({
    summary: 'Retrieve a user by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
  })
  async findById(
    @Param('id') id: string,
  ): Promise<UserResponseDto> {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  @SuccessMessage('User deleted successfully.')
  @ApiOperation({
    summary: 'Delete a user',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
  })
  async delete(
    @Param('id') id: string,
  ): Promise<void> {
    await this.usersService.delete(id);
  }
}