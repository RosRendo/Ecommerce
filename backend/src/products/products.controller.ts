import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService, ProductQueryFilter } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll(@Query() query: any) {
    const filter: ProductQueryFilter = {
      categorySlug: query.category,
      collectionSlug: query.collection,
      minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
      search: query.q,
      isFeatured: query.featured ? query.featured === 'true' : undefined,
      isNewArrival: query.new ? query.new === 'true' : undefined,
      sortBy: query.sortBy,
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 12,
    };

    return this.productsService.findAll(filter);
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id/related')
  async getRelated(@Param('id') id: string, @Query('limit') limit?: string) {
    return this.productsService.getRelated(id, limit ? Number(limit) : 4);
  }
}
