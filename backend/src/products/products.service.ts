import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface ProductQueryFilter {
  categorySlug?: string;
  collectionSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  page?: number;
  limit?: number;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: ProductQueryFilter = {}) {
    const {
      categorySlug,
      collectionSlug,
      minPrice,
      maxPrice,
      search,
      isFeatured,
      isNewArrival,
      sortBy = 'featured',
      page = 1,
      limit = 12,
    } = filter;

    const where: any = {
      isPublished: true,
      deletedAt: null,
    };

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (collectionSlug) {
      where.collections = {
        some: {
          collection: { slug: collectionSlug },
        },
      };
    }

    if (isFeatured !== undefined) {
      where.isFeatured = isFeatured;
    }

    if (isNewArrival !== undefined) {
      where.isNewArrival = isNewArrival;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.basePrice = {};
      if (minPrice !== undefined) where.basePrice.gte = minPrice;
      if (maxPrice !== undefined) where.basePrice.lte = maxPrice;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'price-asc') orderBy = { basePrice: 'asc' };
    if (sortBy === 'price-desc') orderBy = { basePrice: 'desc' };
    if (sortBy === 'newest') orderBy = { createdAt: 'desc' };

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          images: {
            orderBy: { sortOrder: 'asc' },
          },
          category: true,
          variants: {
            include: { inventory: true },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
        collections: {
          include: { collection: true },
        },
        variants: {
          include: { inventory: true },
        },
        reviews: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product || product.deletedAt) {
      throw new NotFoundException(`Product not found with slug: ${slug}`);
    }

    return product;
  }

  async getRelated(productId: string, limit = 4) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { categoryId: true },
    });

    return this.prisma.product.findMany({
      where: {
        id: { not: productId },
        categoryId: product?.categoryId,
        isPublished: true,
        deletedAt: null,
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
      },
      take: limit,
    });
  }
}
