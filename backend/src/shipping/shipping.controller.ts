import { Controller, Get, Param, Query } from '@nestjs/common';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private shippingService: ShippingService) {}

  @Get('methods')
  getMethods(@Query('subtotal') subtotal = '0') {
    return this.shippingService.getAvailableMethods(Number(subtotal));
  }

  @Get('track/:trackingCode')
  async trackShipment(@Param('trackingCode') trackingCode: string) {
    return this.shippingService.trackShipment(trackingCode);
  }
}
