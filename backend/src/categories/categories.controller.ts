import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller()
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('categories')
  async getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('categories/:slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoriesService.getCategoryBySlug(slug);
  }

  @Get('collections')
  async getCollections() {
    return this.categoriesService.getCollections();
  }

  @Get('collections/:slug')
  async getCollectionBySlug(@Param('slug') slug: string) {
    return this.categoriesService.getCollectionBySlug(slug);
  }
}
