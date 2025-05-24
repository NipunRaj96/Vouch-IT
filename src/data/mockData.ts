import { Product, Review } from '../types';

// Generate mock reviews for a product
const generateMockReviews = (productId: string, count: number, avgRating: number): Review[] => {
  const sentiments: Array<'positive' | 'negative' | 'neutral'> = ['positive', 'negative', 'neutral'];
  const reviews: Review[] = [];

  for (let i = 0; i < count; i++) {
    let rating = avgRating + (Math.random() * 2 - 1);
    rating = Math.min(Math.max(rating, 1), 5);
    rating = Math.round(rating * 2) / 2;

    let sentiment: 'positive' | 'negative' | 'neutral';
    if (rating >= 4) sentiment = 'positive';
    else if (rating <= 2) sentiment = 'negative';
    else sentiment = 'neutral';

    if (Math.random() < 0.2) {
      sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    }

    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));

    const comments = {
      positive: [
        "Great product! Really happy with my purchase.",
        "Excellent quality for the price.",
        "Exactly what I needed.",
        "Very satisfied with this product.",
        "Good value for money."
      ],
      neutral: [
        "It's okay for the price.",
        "Average product, works fine.",
        "Not bad, not great.",
        "Decent quality.",
        "Gets the job done."
      ],
      negative: [
        "Not worth the money.",
        "Expected better quality.",
        "Wouldn't recommend.",
        "Disappointing purchase.",
        "Save your money."
      ]
    };

    reviews.push({
      id: `review-${productId}-${i}`,
      productId,
      rating,
      comment: comments[sentiment][Math.floor(Math.random() * comments[sentiment].length)],
      sentiment,
      date: date.toISOString(),
      userName: `User${Math.floor(Math.random() * 1000)}`,
    });
  }

  return reviews;
};

// Mock product data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Comfortable wireless headphones with good sound quality.",
    price: 2499,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    category: "electronics",
    rating: 4.2,
    reviewCount: 45,
    createdAt: "2024-01-15T00:00:00.000Z",
    mockReviews: generateMockReviews("1", 8, 4.2)
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Basic fitness tracking and notifications.",
    price: 1999,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    category: "electronics",
    rating: 4.0,
    reviewCount: 32,
    createdAt: "2024-02-20T00:00:00.000Z",
    mockReviews: generateMockReviews("2", 6, 4.0)
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    description: "Comfortable cotton t-shirt for daily wear.",
    price: 499,
    image: "https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg",
    category: "clothing",
    rating: 4.1,
    reviewCount: 28,
    createdAt: "2024-03-05T00:00:00.000Z",
    mockReviews: generateMockReviews("3", 5, 4.1)
  },
  {
    id: "4",
    name: "Coffee Maker",
    description: "Simple coffee maker for your morning brew.",
    price: 1499,
    image: "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg",
    category: "home",
    rating: 4.3,
    reviewCount: 36,
    createdAt: "2024-01-10T00:00:00.000Z",
    mockReviews: generateMockReviews("4", 7, 4.3)
  },
  {
    id: "5",
    name: "Face Cream",
    description: "Hydrating face cream for daily use.",
    price: 299,
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg",
    category: "beauty",
    rating: 4.0,
    reviewCount: 24,
    createdAt: "2024-02-15T00:00:00.000Z",
    mockReviews: generateMockReviews("5", 5, 4.0)
  },
  {
    id: "6",
    name: "Digital Camera",
    description: "Basic digital camera for everyday photography.",
    price: 15999,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
    category: "electronics",
    rating: 4.4,
    reviewCount: 19,
    createdAt: "2024-01-05T00:00:00.000Z",
    mockReviews: generateMockReviews("6", 4, 4.4)
  }
];