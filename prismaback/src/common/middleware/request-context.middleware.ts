import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const requestId = req.headers['x-request-id'];

    if (typeof requestId !== 'string') {
      req.headers['x-request-id'] = randomUUID();
    }

    res.setHeader('X-Request-Id', req.headers['x-request-id'] as string);

    next();
  }
}

export { RequestContextMiddleware };