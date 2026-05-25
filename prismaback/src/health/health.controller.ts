import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { SkipHeaderValidation } from 'src/common/decorators/skip-header-validation.decorator';

@SkipHeaderValidation()
@Controller('health')
class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthService.check();
  }
}
export { HealthController };
