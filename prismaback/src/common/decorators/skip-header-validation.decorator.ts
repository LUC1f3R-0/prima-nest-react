import { SetMetadata } from '@nestjs/common';

export const SKIP_HEADER_VALIDATION = 'skipHeaderValidation';

export const SkipHeaderValidation = () =>
  SetMetadata(SKIP_HEADER_VALIDATION, true);
