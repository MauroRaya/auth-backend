import { Injectable } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  async check(): Promise<HealthCheckResult> {
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
