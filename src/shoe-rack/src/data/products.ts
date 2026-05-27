export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  category: 'Men' | 'Women' | 'Unisex';
  sizes: number[];
  colors: string[];
  stock: number;
  tags: string[];
  description: string;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Jordan',
    price: 14999,
    images: [
      'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=600',
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=600'
    ],
    rating: 4.9,
    reviewCount: 1240,
    category: 'Men',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Red', 'White', 'Black'],
    stock: 15,
    tags: ['trending', 'bestseller'],
    description: 'The Air Jordan 1 Retro High OG is a work of nostalgic art. Built with premium leather and iconic color blocking, it represents the genesis of sneaker culture.'
  },
  {
    id: '2',
    name: 'Nike Dunk Low Panda',
    brand: 'Nike',
    price: 8999,
    originalPrice: 12499,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600'
    ],
    rating: 4.8,
    reviewCount: 3200,
    category: 'Unisex',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['Black', 'White'],
    stock: 50,
    tags: ['bestseller'],
    description: 'A classic that never goes out of style. The Nike Dunk Low Panda features a crisp black and white colorway that pairs perfectly with any outfit.'
  },
  {
    id: '3',
    name: 'Yeezy Boost 350 V2',
    brand: 'Adidas',
    price: 18999,
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600'
    ],
    rating: 4.7,
    reviewCount: 890,
    category: 'Men',
    sizes: [8, 9, 10, 11],
    colors: ['Grey', 'Orange'],
    stock: 5,
    tags: ['limited'],
    description: 'Engineered with Primeknit and Boost technology, the Yeezy 350 V2 delivers unparalleled comfort and avant-garde streetwear aesthetics.'
  },
  {
    id: '4',
    name: 'Puma RS-X3 Puzzle',
    brand: 'Puma',
    price: 9999,
    images: [
      'https://images.unsplash.com/photo-1584735175315-9d5df23be3da?w=600'
    ],
    rating: 4.5,
    reviewCount: 450,
    category: 'Women',
    sizes: [5, 6, 7, 8, 9],
    colors: ['Pink', 'White', 'Blue'],
    stock: 20,
    tags: ['new'],
    description: 'Chunky, bold, and unapologetic. The Puma RS-X3 Puzzle brings retro running vibes into the modern streetwear scene.'
  },
  {
    id: '5',
    name: 'New Balance 550',
    brand: 'New Balance',
    price: 8999,
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600'
    ],
    rating: 4.8,
    reviewCount: 670,
    category: 'Unisex',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['White', 'Green'],
    stock: 35,
    tags: ['trending'],
    description: 'A revival of the 1989 classic, the New Balance 550 offers a clean, low-top silhouette that dominated basketball courts and now rules the streets.'
  },
  {
    id: '6',
    name: 'Nike Air Max 97',
    brand: 'Nike',
    price: 14499,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'
    ],
    rating: 4.6,
    reviewCount: 1120,
    category: 'Men',
    sizes: [8, 9, 10, 11, 12],
    colors: ['Red', 'Silver'],
    stock: 12,
    tags: ['trending'],
    description: 'Inspired by Japanese bullet trains, the Nike Air Max 97 features sleek metallic finishes and full-length Air cushioning.'
  },
  {
    id: '7',
    name: 'Ultraboost 22',
    brand: 'Adidas',
    price: 15999,
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600'
    ],
    rating: 4.9,
    reviewCount: 2200,
    category: 'Women',
    sizes: [6, 7, 8, 9],
    colors: ['Black', 'Purple'],
    stock: 8,
    tags: ['bestseller', 'running'],
    description: 'Experience supreme energy return with the Ultraboost 22, designed specifically for the female foot profile.'
  },
  {
    id: '8',
    name: 'Air Jordan 4 Retro',
    brand: 'Jordan',
    price: 17499,
    images: [
      'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=600'
    ],
    rating: 4.9,
    reviewCount: 950,
    category: 'Men',
    sizes: [9, 10, 11, 12],
    colors: ['Black', 'Cement Grey'],
    stock: 3,
    tags: ['limited'],
    description: 'A masterpiece from Tinker Hatfield, the AJ4 features distinctive mesh netting and support wings.'
  }
];
