import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers)
    const token = request.headers['authorization'].split(' ')[1];
    if (!token) {
      return false;
    }
    try {
      const decodedToken = jwt.verify(token, '0p4-ch4v3-5UP3R-53cr3t4');
      return true;
    } catch (error) {
      return false;
    }
  }
}
