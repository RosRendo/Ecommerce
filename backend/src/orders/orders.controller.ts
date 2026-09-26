import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateOrderDto, OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }

  @Get(':orderNumber')
  async getOrderByNumber(@Param('orderNumber') orderNumber: string) {
    return this.ordersService.getOrderByNumber(orderNumber);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/history')
  async getUserOrders(@Req() req: any) {
    return this.ordersService.getUserOrders(req.user.id);
  }
}
