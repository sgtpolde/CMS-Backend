// src/tasks/task.controller.ts

import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  SetMetadata,
  UseGuards,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './models/task.entity';
import { RoleGuard } from 'src/roles/role.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/users/user.service';
import { CreateTaskDto } from './models/createTaskDto.dto';
import { Request } from 'express';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['company'])
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const userId = await this.authService.userId(req); // Get the user's ID from AuthService
    const user = await this.userService.findOne({ where: { id: userId } }); // Fetch the user using the ID

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.taskService.createTask(createTaskDto, user);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin'])
  @Put(':id/approve')
  async approveTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.approveTask(id);
  }
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin'])
  @Put(':id/reject')
  async rejectTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.rejectTask(id);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['employee'])
  @Put(':id/accept')
  async acceptTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.acceptTask(id);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['company','employee','admin'])
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  // Implement more controller methods as needed
}
