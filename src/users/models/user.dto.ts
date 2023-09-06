export class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
  
  export class UpdateUserDto {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  }
  
  export class AssignRolesDto {
    roleIds: number[]; // An array of role IDs
  }
  