import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('metrics')
  async getMetrics() {
    return this.adminService.getDashboardMetrics();
  }

  @Get('orders')
  async getRecentOrders(@Query('limit') limit?: string) {
    return this.adminService.getRecentOrders(limit ? Number(limit) : 10);
  }

  @Get('inventory')
  async getAllInventory() {
    return this.adminService.getAllInventory();
  }
}
