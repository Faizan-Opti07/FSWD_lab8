import { Injectable, NotFoundException } from '@nestjs/common';

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERED';
  createdAt: string;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [
    {
      id: 1,
      orderNumber: 'VOID-7701',
      firstName: 'Faizan',
      lastName: 'Tariq',
      email: 'faizan@securitylab.edu',
      address: 'Cyber Defense Lab 402, AU Islamabad',
      items: [
        {
          productId: 1,
          name: 'VOID // 127.0.0.1 TEE',
          price: 42,
          quantity: 1,
        },
        {
          productId: 5,
          name: 'MALWARE TRIAGE KEY',
          price: 45,
          quantity: 1,
        },
      ],
      total: 87,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(query?: { email?: string; status?: string }) {
    let result = [...this.orders];

    if (query?.email) {
      result = result.filter((o) =>
        o.email.toLowerCase().includes(query.email.toLowerCase()),
      );
    }

    if (query?.status) {
      result = result.filter(
        (o) => o.status.toLowerCase() === query.status.toLowerCase(),
      );
    }

    return {
      total: result.length,
      data: result,
    };
  }

  findOne(id: number) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  create(orderData: any) {
    const nextId =
      this.orders.length > 0
        ? Math.max(...this.orders.map((o) => o.id)) + 1
        : 1;

    const items: OrderItem[] = orderData.items || [];
    const calculatedTotal =
      orderData.total ||
      items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

    const newOrder: Order = {
      id: nextId,
      orderNumber: `VOID-${Math.floor(1000 + Math.random() * 9000)}`,
      firstName: orderData.firstName || 'Operator',
      lastName: orderData.lastName || 'Defender',
      email: orderData.email || 'operator@securitylab.edu',
      address: orderData.address || 'Academic Cyber Lab',
      items,
      total: calculatedTotal,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    this.orders.push(newOrder);

    return {
      message: 'Requisition order dispatched successfully',
      order: newOrder,
    };
  }
}
