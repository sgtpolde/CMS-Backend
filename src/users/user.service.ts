// src/users/user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import {
  AssignRolesDto,
  CreateUserDto,
  UpdateUserDto,
} from './models/user.dto';
import { Role } from 'src/roles/models/role.entity';
import { AbstractService } from 'src/common/common.service';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async fetchUserRoles(userId: number): Promise<string[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'], // Load the user's roles
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Extract role names from the user's roles
    const roleNames = user.roles.map((role) => role.name);

    return roleNames;
  }
}
