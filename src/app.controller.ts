import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('compare')
  async comparePrices(@Query('product') product: string): Promise<any> {
    return this.appService.comparePrices(product);
  }
}
