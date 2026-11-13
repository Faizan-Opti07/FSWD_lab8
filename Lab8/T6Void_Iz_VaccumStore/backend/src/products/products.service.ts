import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  tag: string;
  imageUrl: string;
  stock: number;
}

@Injectable()
export class ProductsService {
  // Simple cyber tools & gear for VOID IN VACCUM STORE
  private products: Product[] = [
    {
      id: 1,
      name: 'Malware Triage USB Stick',
      category: 'malware-analysis',
      description: 'Hardware write-blocked USB drive used for safe static malware inspection and testing files in isolated lab environments.',
      price: 35,
      tag: 'MALWARE ANALYSIS',
      imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
      stock: 25,
    },
    {
      id: 2,
      name: 'RF Signal Sender & SDR Module',
      category: 'hardware-tools',
      description: 'Educational sub-GHz radio frequency sender and receiver for learning wireless signal analysis and communication protocols.',
      price: 49,
      tag: 'RF TOOL',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      stock: 15,
    },
    {
      id: 3,
      name: 'Ethernet Packet Tap Tool',
      category: 'network-tools',
      description: 'Simple passive network tap used to capture traffic and practice network inspection using Wireshark.',
      price: 29,
      tag: 'PACKET SNIFFER',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      stock: 30,
    },
    {
      id: 4,
      name: 'Cyber Security Blue Team T-Shirt',
      category: 'apparel',
      description: 'Comfortable cotton t-shirt with clean cyber security logo for students and analysts.',
      price: 25,
      tag: 'APPAREL',
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
      stock: 40,
    },
    {
      id: 5,
      name: 'Cyber Security Analyst Cap',
      category: 'apparel',
      description: 'Black cotton baseball cap with embroidered security terminal text.',
      price: 20,
      tag: 'APPAREL',
      imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
      stock: 35,
    },
    {
      id: 6,
      name: 'Hardware Security Key (FIDO2)',
      category: 'security-hardware',
      description: 'USB hardware key for two-factor authentication and access control practice.',
      price: 45,
      tag: 'SECURITY HARDWARE',
      imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
      stock: 20,
    },
  ];

  findAll(query?: { search?: string; tag?: string; category?: string; minPrice?: string; maxPrice?: string }) {
    let result = [...this.products];

    if (query?.search) {
      const q = query.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    if (query?.tag) {
      result = result.filter(
        (p) => p.tag.toLowerCase() === query.tag.toLowerCase(),
      );
    }

    if (query?.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === query.category.toLowerCase(),
      );
    }

    if (query?.minPrice) {
      const min = parseFloat(query.minPrice);
      if (!isNaN(min)) {
        result = result.filter((p) => p.price >= min);
      }
    }

    if (query?.maxPrice) {
      const max = parseFloat(query.maxPrice);
      if (!isNaN(max)) {
        result = result.filter((p) => p.price <= max);
      }
    }

    return {
      total: result.length,
      data: result,
    };
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  create(productData: Partial<Product>) {
    const nextId =
      this.products.length > 0
        ? Math.max(...this.products.map((p) => p.id)) + 1
        : 1;

    const newProduct: Product = {
      id: nextId,
      name: productData.name || 'New Cyber Tool',
      category: productData.category || 'tools',
      description: productData.description || 'Educational cyber security tool',
      price: Number(productData.price) || 30,
      tag: productData.tag || 'TOOLS',
      imageUrl:
        productData.imageUrl ||
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      stock: Number(productData.stock) || 10,
    };

    this.products.push(newProduct);
    return {
      message: 'Product created successfully',
      product: newProduct,
    };
  }
}
