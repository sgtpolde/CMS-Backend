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
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './models/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/roles/role.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin'])
  getAllUsers() {
    return this.userService.all(); // Use the common 'all' method
  }

  @Post()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin'])
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto); // Use the common 'create' method
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin'])
  getUser(@Param('id') id: number) {
    return this.userService.findOne({ where: { id } }); // Use the common 'findOne' method
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin'])
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto); // Use the common 'update' method
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin'])
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id); // Use the common 'delete' method
  }
}
