// guards/role.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!requiredRoles) {
      return true; // No roles are required, so access is allowed
    }

    const { user } = context.switchToHttp().getRequest();

    // Check if the user's roles include the required role
    const hasRequiredRole = user.roles.some((userRole) =>
      requiredRoles.includes(userRole.name),
    );

    return hasRequiredRole;
  }
}
