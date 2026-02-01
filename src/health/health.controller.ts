import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return await this.health.check([
      async () =>
        await this.disk.checkStorage('disk', {
          path: '/',
          thresholdPercent: 0.8,
        }),
      async () => await this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      async () => await this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      async () => await this.db.pingCheck('database'),
    ]);
  }
}
