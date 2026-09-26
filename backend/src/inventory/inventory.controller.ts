import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get('check/:variantId')
  async checkAvailability(
    @Param('variantId') variantId: string,
    @Query('quantity') quantity = '1',
  ) {
    return this.inventoryService.checkAvailability(variantId, Number(quantity));
  }

  @UseGuards(JwtAuthGuard)
  @Get('low-stock')
  async getLowStockAlerts() {
    return this.inventoryService.getLowStockAlerts();
  }
}
