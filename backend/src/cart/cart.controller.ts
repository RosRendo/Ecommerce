import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(@Query('userId') userId?: string, @Query('guestToken') guestToken?: string) {
    return this.cartService.getOrCreateCart(userId, guestToken);
  }

  @Post(':cartId/items')
  async addItem(
    @Param('cartId') cartId: string,
    @Body() body: { variantId: string; quantity: number },
  ) {
    return this.cartService.addItem(cartId, body.variantId, body.quantity || 1);
  }

  @Patch(':cartId/items/:itemId')
  async updateQuantity(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateItemQuantity(cartId, itemId, quantity);
  }

  @Delete(':cartId/items/:itemId')
  async removeItem(@Param('cartId') cartId: string, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(cartId, itemId);
  }

  @Post(':cartId/coupon')
  async applyCoupon(@Param('cartId') cartId: string, @Body('code') code: string) {
    return this.cartService.applyCoupon(cartId, code);
  }
}
