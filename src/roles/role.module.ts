import { RoleController } from './role.controller';
import { UserService } from 'src/users/user.service';
import { Role } from './models/role.entity';
import { RoleService } from './role.service';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/users/user.module';
import { PermissionModule } from 'src/permissions/permission.module';
import { PermissionService } from 'src/permissions/permission.service';
import { Permission } from 'src/permissions/models/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), PermissionModule],
  controllers: [RoleController],
  providers: [RoleService, PermissionService],
  exports: [RoleService],
})
export class RoleModule {}
