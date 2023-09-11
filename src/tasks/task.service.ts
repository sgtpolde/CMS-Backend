// src/tasks/task.service.ts

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './models/task.entity';
import { AbstractService } from 'src/common/common.service'; 
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/models/user.entity';

@Injectable()
export class TaskService extends AbstractService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly authService: AuthService,
  ) {
    super(taskRepository);
  }

  async createTask(data: Partial<Task>, user: User): Promise<Task> {
    // Assign the createdBy user to the task
    data.createdBy = user;

    // Create and save the task
    const task = this.taskRepository.create(data);
    return this.taskRepository.save(task);
  }

  async approveTask(id: number): Promise<Task> {
    // Implement logic to approve a task by the admin
    // Update task status to 'approved'
    return super.update(id, { approved: true });
  }

  async rejectTask(id: number): Promise<Task> {
    // Implement logic to reject a task by the admin
    // Update task status to 'rejected'
    return super.update(id, { rejected: false });
  }

  async acceptTask(id: number): Promise<Task> {
    // Implement logic to accept a task by an employee
    // Update task status to 'accepted'
    return super.update(id, { accepted: false });
  }

  async getAllTasks(): Promise<Task[]> {
    // Retrieve all tasks
    return super.all();
  }

  async getTaskById(id: number): Promise<Task> {
    // Retrieve a task by ID
    return super.findOne(id);
  }

  // Implement more methods for task management as needed
}
