export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  gallery?: string[];
  category: string;
  rating: number;
  reviewCount: number;
  specs?: string[];
  createdAt: string;
  mockReviews?: Review[];
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  date: string;
  userName?: string;
}

export interface FilterOptions {
  category: string;
  priceRange: string;
  rating: string;
  sortBy: string;
}