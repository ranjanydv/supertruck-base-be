import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

//
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

//
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    // If decorator is used, we can bypass jwt auth requirement
    if (isPublic) return true;

    //
    return super.canActivate(context);
  }
}