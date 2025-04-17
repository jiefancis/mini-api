import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Metrics } from './utils/metrics';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('metrics')
  async getMetrics() {
    return await Metrics();
  }
}
