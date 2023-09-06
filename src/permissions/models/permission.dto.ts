// src/roles/dto/permission.dto.ts

export class CreatePermissionDto {
    name: string;
    description: string;
  }
  
  export class UpdatePermissionDto {
    name?: string;
    description?: string;
  }
  