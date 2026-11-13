import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    ReviewsModule,
    NewsletterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

