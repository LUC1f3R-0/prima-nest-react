import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { validate as isUuid } from 'uuid';

const MUTATING_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

@Injectable()
export class HeadersValidationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

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
