import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestContextMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers['x-request-id']) {
      req.headers['x-request-id'] = randomUUID();
    }

    res.setHeader('X-Request-Id', req.headers['x-request-id']);

    const safeHeaders = { ...req.headers };

    delete safeHeaders.authorization;
    delete safeHeaders.cookie;
    delete safeHeaders['x-api-key'];

    this.logger.debug({
      method: req.method,
      url: req.originalUrl,
      headers: safeHeaders,
    });

    next();
  }
}
