import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Module } from '@nestjs/common';
import { Permission } from './models/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/roles/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService]
})
export class PermissionModule {}
