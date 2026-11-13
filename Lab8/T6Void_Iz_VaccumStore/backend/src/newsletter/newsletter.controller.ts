import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  // GET /newsletter or GET /newsletter?search=...
  @Get()
  findAll(@Query() query: any) {
    return this.newsletterService.findAll(query);
  }

  // POST /newsletter/subscribe
  @Post('subscribe')
  subscribe(@Body() body: any) {
    return this.newsletterService.subscribe(body);
  }
}

