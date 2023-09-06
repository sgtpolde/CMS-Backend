// src/users/users.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './models/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.all(); // Use the common 'all' method
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto); // Use the common 'create' method
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.findOne({ where: { id } }); // Use the common 'findOne' method
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto); // Use the common 'update' method
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id); // Use the common 'delete' method
  }
}
