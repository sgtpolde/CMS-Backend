import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './models/role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }
  //in case of needing to delete, just make a new post request with correct values
  @Post(':roleId/permissions')
  async associatePermissionsWithRole(
    @Param('roleId') roleId: number,
    @Body() body: { permissionIds: number[] },
  ) {
    const { permissionIds } = body;
    await this.rolesService.associatePermissionsWithRole(roleId, permissionIds);
    return { message: 'Permissions associated with role successfully.' };
  }
  
  /* in case of needing to delete, just make a new post request with correct values
  @Delete(':roleId/permissions')
  async disassociatePermissionsFromRole(
    @Param('roleId') roleId: number,
    @Body() body: { permissionIds: number[] }, // Parse the request body
  ) {
    const { permissionIds } = body; // Extract permissionIds from the parsed body
  
    await this.rolesService.disassociatePermissionsFromRole(roleId, permissionIds);
  }
  */

  // You can add more controller methods for managing roles and permissions
}
