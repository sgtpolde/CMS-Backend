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
}
