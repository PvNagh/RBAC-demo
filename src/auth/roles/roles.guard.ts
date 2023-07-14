import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector){} // this gets the permissions req to access a current endpoint as set in metadata
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const [req]=context.getArgs();
    const userPermissions = req?.user?.role || [];
    const requiredPermissions = this.reflector.get<string>('roles',context.getHandler());

    if(!requiredPermissions) return true;

    const hasRole = userPermissions  === requiredPermissions;
    return hasRole;
  }
}
