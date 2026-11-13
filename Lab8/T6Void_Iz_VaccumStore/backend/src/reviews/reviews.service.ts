import { Injectable } from '@nestjs/common';

export interface Review {
  id: number;
  rating: number;
  comment: string;
  author: string;
  tag: string;
  createdAt: string;
}

@Injectable()
export class ReviewsService {
  private reviews: Review[] = [
    {
      id: 1,
      rating: 5,
      comment: 'The write-blocked malware drive made setting up our university static triage lab seamless. Truly clean build.',
      author: 'F. MALIK',
      tag: 'THREAT ANALYST',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      rating: 5,
      comment: 'The 127.0.0.1 heavyweight tee is top quality. Heavyweight fabric, doesn\'t shrink, and the print is iconic.',
      author: 'S. AHMED',
      tag: 'INCIDENT RESPONDER',
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      rating: 5,
      comment: 'The educational RF dongle is invaluable for visualizing frequencies and packet replays on test equipment.',
      author: 'A. KHAN',
      tag: 'SECURITY RESEARCHER',
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(query?: { rating?: string; search?: string }) {
    let result = [...this.reviews];

    if (query?.rating) {
      const r = parseInt(query.rating, 10);
      if (!isNaN(r)) {
        result = result.filter((item) => item.rating === r);
      }
    }

    if (query?.search) {
      const q = query.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.comment.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q),
      );
    }

    return {
      total: result.length,
      data: result,
    };
  }

  create(reviewData: any) {
    const nextId =
      this.reviews.length > 0
        ? Math.max(...this.reviews.map((r) => r.id)) + 1
        : 1;

    const newReview: Review = {
      id: nextId,
      rating: Number(reviewData.rating) || 5,
      comment: reviewData.comment || 'Verified lab hardware equipment.',
      author: reviewData.author || 'OPERATOR',
      tag: reviewData.tag || 'RESEARCHER',
      createdAt: new Date().toISOString(),
    };

    this.reviews.push(newReview);

    return {
      message: 'Dispatch review submitted successfully',
      review: newReview,
    };
  }
}
