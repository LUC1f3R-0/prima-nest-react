import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { validate as isUuid } from 'uuid';
import { SKIP_HEADER_VALIDATION } from '../decorators/skip-header-validation.decorator';

const MUTATING_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

@Injectable()
export class HeadersValidationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const skipValidation = this.reflector.getAllAndOverride<boolean>(
      SKIP_HEADER_VALIDATION,
      [context.getHandler(), context.getClass()],
    );

    if (skipValidation) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    if (request.method.toUpperCase() === 'OPTIONS') {
      return true;
    }

    const requestId = request.headers['x-request-id'];
    const idempotencyKey = request.headers['idempotency-key'];

    if (typeof requestId !== 'string' || !isUuid(requestId)) {
      throw new BadRequestException('Valid X-Request-Id header is required');
    }

    if (MUTATING_METHODS.includes(request.method.toUpperCase())) {
      if (typeof idempotencyKey !== 'string' || !isUuid(idempotencyKey)) {
        throw new BadRequestException(
          `Valid Idempotency-Key header is required for ${request.method.toUpperCase()} requests`,
        );
      }
    }

    return true;
  }
}
