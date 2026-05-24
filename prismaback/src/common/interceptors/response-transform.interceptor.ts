import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Request } from 'express';

type ControllerResponse<T> = {
  message?: string;
  data?: T;
};

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  requestId: string | null;
  timestamp: string;
}

@Injectable()
class ResponseTransformInterceptor<T> implements NestInterceptor<
  T | ControllerResponse<T>,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T | ControllerResponse<T>>,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const requestId = (request.headers['x-request-id'] as string) ?? null;

    return next.handle().pipe(
      map((response) => {
        const isCustomResponse =
          response &&
          typeof response === 'object' &&
          'message' in response &&
          'data' in response;

        return {
          success: true,
          message: isCustomResponse
            ? String((response as ControllerResponse<T>).message)
            : 'Request successful',
          data: isCustomResponse
            ? ((response as ControllerResponse<T>).data ?? null)
            : (response as T),
          requestId,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}

export { ResponseTransformInterceptor };
