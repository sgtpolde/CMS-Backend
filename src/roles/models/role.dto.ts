// src/roles/dto/role.dto.ts

export class CreateRoleDto {
    name: string;
    description: string;
  }
  
  export class UpdateRoleDto {
    name?: string;
    description?: string;
  }
  