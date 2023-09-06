import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './models/role.entity';
import { AbstractService } from 'src/common/common.service';
import { Permission } from 'src/permissions/models/permission.entity';

@Injectable()
export class RoleService extends AbstractService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {
    super(roleRepository);
  }

  //add permision to the role
  async associatePermissionsWithRole(roleId: number, permissionIds: number[]) {
    try {
      const role = await this.roleRepository.findOne({
        where: { id: roleId },
        relations: ['permissions'],
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      console.log('Permission IDs:', permissionIds);

      // Ensure permissionIds is an array
      if (!Array.isArray(permissionIds)) {
        throw new Error('Permission IDs should be provided as an array.');
      }

      // Fetch permission entities based on the IDs using find
      const permissions = await this.permissionRepository.find({
        where: permissionIds.map((id) => ({ id })),
      });

      console.log('Fetched Permissions:', permissions);

      // Assign the fetched permissions to the role
      role.permissions = permissions;

      await this.roleRepository.save(role);
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error
    }
  }
  /*
  //Delete the permission from the role
  async disassociatePermissionsFromRole(
    roleId: number,
    permissionIds: number[],
  ) {
    try {
      const role = await this.roleRepository.findOne({
        where: { id: roleId },
        relations: ['permissions'],
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      console.log('Permission IDs to disassociate:', permissionIds);

      // Ensure permissionIds is an array
      if (!Array.isArray(permissionIds)) {
        throw new Error('Permission IDs should be provided as an array.');
      }

      // Fetch permission entities based on the IDs
      const permissionsToRemove =
        await this.permissionRepository.findByIds(permissionIds);

      console.log('Permissions to disassociate:', permissionsToRemove);

      // Remove the associations from the role
      role.permissions = role.permissions.filter((permission) => {
        return !permissionsToRemove.some((p) => p.id === permission.id);
      });

      // Save the updated role without these associations
      await this.roleRepository.save(role);
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error
    }
  }
*/
  // Implement CRUD operations for roles here.
}
