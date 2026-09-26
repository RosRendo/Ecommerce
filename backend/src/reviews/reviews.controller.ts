import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateReviewDto, ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('product/:productId')
  async getProductReviews(@Param('productId') productId: string) {
    return this.reviewsService.getProductReviews(productId);
  }

  @Post()
  async createReview(@Body() dto: CreateReviewDto, @Req() req: any) {
    if (req.user?.id) {
      dto.userId = req.user.id;
    }
    return this.reviewsService.createReview(dto);
  }
}
