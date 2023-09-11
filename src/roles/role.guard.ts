import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service'; // Import your AuthService
import { UserService } from 'src/users/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UserService, // Inject the AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    console.log("Required roles: ",requiredRoles);

    if (!requiredRoles) {
      return true; // No roles are required, so access is allowed
    }

    const request = context.switchToHttp().getRequest();

    try {
      // Retrieve the user ID using the AuthService
      const userId = await this.authService.userId(request);
      console.log("user id:", userId);
      // Fetch user roles based on the user ID (you should implement this)
      const userRoles = await this.userService.fetchUserRoles(userId);
      console.log("User roles: ", userRoles);
      // Check if the user's roles include the required role
      const hasRequiredRole = userRoles.some((userRole) =>
        requiredRoles.includes(userRole),
      );

      return hasRequiredRole;
    } catch (error) {
      return false; // An error occurred or user not authenticated
    }
  }

  /* Implement this method to fetch user roles based on the user ID
  async fetchUserRoles(userId: number): Promise<string[]> {
    // You should implement this logic to fetch user roles from your database
    // Return an array of role names (e.g., ['Admin', 'Employee'])
    // You can use TypeORM or your preferred database library to fetch roles
    // Example pseudocode: return database.fetchUserRoles(userId);
    
  }*/
}
