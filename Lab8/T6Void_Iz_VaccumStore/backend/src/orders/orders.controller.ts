import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // GET /orders or GET /orders?email=...&status=...
  @Get()
  findAll(@Query() query: any) {
    return this.ordersService.findAll(query);
  }

  // GET /orders/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(Number(id));
  }

  // POST /orders
  @Post()
  create(@Body() orderData: any) {
    return this.ordersService.create(orderData);
  }
}

