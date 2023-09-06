import { Controller, Post, Body } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './models/permission.dto';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionsService: PermissionService) {}

  @Post()
  async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionsService.create(createPermissionDto);
  }

  // You can add more controller methods for managing permissions
}
