import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products or GET /products?search=...&tag=...&minPrice=...&maxPrice=...
  @Get()
  findAll(@Query() query: any) {
    return this.productsService.findAll(query);
  }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  // POST /products
  @Post()
  create(@Body() productData: any) {
    return this.productsService.create(productData);
  }
}

