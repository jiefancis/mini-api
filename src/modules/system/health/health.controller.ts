import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  // 健康检查
  @Get()
  async health() {
    return {
      status: 'ok',
    };
  }
}
