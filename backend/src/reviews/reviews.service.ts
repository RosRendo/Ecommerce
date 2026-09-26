import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateReviewDto {
  productId: string;
  userId?: string;
  rating: number;
  title?: string;
  comment: string;
  authorName: string;
}

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getProductReviews(productId: string) {
    const reviews = await this.prisma.review.findMany({
      where: {
        productId,
        isPublished: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = reviews.length;
    const averageRating = total > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / total : 5;

    return {
      reviews,
      metrics: {
        total,
        averageRating: Number(averageRating.toFixed(1)),
      },
    };
  }

  async createReview(dto: CreateReviewDto) {
    if (dto.rating < 1 || dto.rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    let verifiedPurchase = false;
    if (dto.userId) {
      const order = await this.prisma.order.findFirst({
        where: {
          userId: dto.userId,
          status: { in: ['CONFIRMED', 'DELIVERED', 'SHIPPED'] },
          items: {
            some: {
              variant: { productId: dto.productId },
            },
          },
        },
      });
      verifiedPurchase = !!order;
    }

    return this.prisma.review.create({
      data: {
        productId: dto.productId,
        userId: dto.userId,
        rating: dto.rating,
        title: dto.title,
        comment: dto.comment,
        authorName: dto.authorName,
        verifiedPurchase,
        isPublished: true,
      },
    });
  }
}
