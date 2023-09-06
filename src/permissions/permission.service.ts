import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { Permission } from './models/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionService extends AbstractService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {
    super(permissionRepository);
  }
}
