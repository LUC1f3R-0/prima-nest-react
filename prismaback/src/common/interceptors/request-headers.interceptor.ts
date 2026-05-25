import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

@Injectable()
class RequestHeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    // Auto-generate X-Request-Id if missing
    if (!request.headers['x-request-id']) {
      request.headers['x-request-id'] = randomUUID();
    }

    // Auto-generate Idempotency-Key for mutating operations if missing
    const method = request.method.toLowerCase();
    if (['post', 'put', 'patch', 'delete'].includes(method)) {
      if (!request.headers['idempotency-key']) {
        request.headers['idempotency-key'] = randomUUID();
      }
    }

    // Expose X-Request-Id in response headers
    response.setHeader('X-Request-Id', request.headers['x-request-id']);

    return next.handle();
  }
}

export { RequestHeadersInterceptor };
