import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // GET /reviews or GET /reviews?rating=5&search=fit
  @Get()
  findAll(@Query() query: any) {
    return this.reviewsService.findAll(query);
  }

  // POST /reviews
  @Post()
  create(@Body() reviewData: any) {
    return this.reviewsService.create(reviewData);
  }
}

