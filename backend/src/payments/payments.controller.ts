import { Body, Controller, Headers, HttpCode, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create-intent/:orderId')
  async createPaymentIntent(@Param('orderId') orderId: string) {
    return this.paymentsService.createPaymentIntent(orderId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('webhook')
  async handleWebhook(
    @Req() req: any,
    @Headers('stripe-signature') signature: string,
    @Body() body: any,
  ) {
    const rawBody = req.rawBody || Buffer.from(JSON.stringify(body));
    return this.paymentsService.handleWebhook(rawBody, signature);
  }
}
