import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { timeout } from 'rxjs';

const API_BASE_URL = environment?.baseUrl ?? 'http://localhost:3001/';

const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const isAbsoluteUrl = req.url.startsWith('http://') || req.url.startsWith('https://');

  const normalizeBaseUrl = API_BASE_URL.replace('/\/+$/', '');
  const normalizedPath = req.url.startsWith('/') ? req.url : `/${req.url}`;

  const apiUrl = isAbsoluteUrl ? req.url : `${normalizeBaseUrl}${normalizedPath}`;

  const method = req.method.toLowerCase();
  const hasBody = req.body !== null && req.body !== undefined;
  const isFormData = req.body instanceof FormData;

  let headers = req.headers;

  headers = headers.set('Accept', 'application/json');
  headers = headers.set('X-Request-Id', crypto.randomUUID());

  if (['post', 'put', 'patch', 'delete'].includes(method)) {
    headers = headers.set('Idempotency-Key', crypto.randomUUID());
  }

  if (hasBody && !isFormData) {
    headers = headers.set('Content-Type', 'application/json');
  }

  if (isFormData) {
    headers = headers.delete('Content-Type');
  }

  const clonedRequest = req.clone({ url: apiUrl, headers });

  return next(clonedRequest).pipe(timeout(10000));
};

export default apiInterceptor;
