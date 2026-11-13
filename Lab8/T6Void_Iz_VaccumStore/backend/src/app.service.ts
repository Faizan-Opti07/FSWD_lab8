import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: 'VOID IN VACCUM STORE API',
      version: '1.0.0',
      description: 'REST API for Void in Vaccum Store - Cyber Security Educational Tools & Gear',
      modules: ['products', 'orders', 'reviews', 'newsletter'],
      endpoints: {
        products: {
          'GET /products': 'Get all tools and products (supports ?search=&category=&tag=)',
          'GET /products/:id': 'Get product by ID',
          'POST /products': 'Create a new product',
        },
        orders: {
          'GET /orders': 'Get all orders',
          'GET /orders/:id': 'Get order by ID',
          'POST /orders': 'Submit a new order',
        },
        reviews: {
          'GET /reviews': 'Get all reviews',
          'POST /reviews': 'Submit a review',
        },
        newsletter: {
          'GET /newsletter': 'Get subscribers',
          'POST /newsletter/subscribe': 'Subscribe to newsletter',
        },
      },
    };
  }
}
