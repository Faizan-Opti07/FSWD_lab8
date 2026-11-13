import { Injectable } from '@nestjs/common';

export interface Subscriber {
  id: number;
  email: string;
  subscribedAt: string;
}

@Injectable()
export class NewsletterService {
  // In-memory store
  private subscribers: Subscriber[] = [
    {
      id: 1,
      email: 'insider@voidizvaccum.com',
      subscribedAt: new Date().toISOString(),
    },
  ];

  findAll(query?: { search?: string }) {
    let result = [...this.subscribers];

    if (query?.search) {
      result = result.filter((s) =>
        s.email.toLowerCase().includes(query.search.toLowerCase()),
      );
    }

    return {
      total: result.length,
      data: result,
    };
  }

  subscribe(data: { email: string }) {
    const email = data?.email?.trim();
    if (!email) {
      return { error: 'Valid email address is required' };
    }

    const exists = this.subscribers.find(
      (s) => s.email.toLowerCase() === email.toLowerCase(),
    );
    if (exists) {
      return {
        message: 'Email is already subscribed to Void Iz Vaccum signal drops',
        subscriber: exists,
      };
    }

    const nextId =
      this.subscribers.length > 0
        ? Math.max(...this.subscribers.map((s) => s.id)) + 1
        : 1;

    const newSub: Subscriber = {
      id: nextId,
      email,
      subscribedAt: new Date().toISOString(),
    };

    this.subscribers.push(newSub);

    return {
      message: 'Subscribed to the signal successfully',
      subscriber: newSub,
    };
  }
}

