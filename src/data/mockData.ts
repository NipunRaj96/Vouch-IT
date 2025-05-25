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
    name: "Air Purifier",
    description: "HEPA filter air purifier for clean indoor air.",
    price: 4999,
    image: "https://images.pexels.com/photos/4429559/pexels-photo-4429559.jpeg",
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
  },
  {
    id: "7",
    name: "Running Shoes",
    description: "Comfortable running shoes for daily workouts.",
    price: 1999,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    category: "clothing",
    rating: 4.3,
    reviewCount: 42,
    createdAt: "2024-02-25T00:00:00.000Z",
    mockReviews: generateMockReviews("7", 7, 4.3)
  },
  {
    id: "8",
    name: "Backpack",
    description: "Durable backpack for everyday use.",
    price: 899,
    image: "https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg",
    category: "accessories",
    rating: 4.2,
    reviewCount: 31,
    createdAt: "2024-03-10T00:00:00.000Z",
    mockReviews: generateMockReviews("8", 6, 4.2)
  },
  {
    id: "9",
    name: "Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness.",
    price: 799,
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
    category: "home",
    rating: 4.1,
    reviewCount: 27,
    createdAt: "2024-01-20T00:00:00.000Z",
    mockReviews: generateMockReviews("9", 5, 4.1)
  },
  {
    id: "10",
    name: "Water Bottle",
    description: "Insulated water bottle for hot and cold drinks.",
    price: 599,
    image: "https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg",
    category: "accessories",
    rating: 4.4,
    reviewCount: 38,
    createdAt: "2024-02-10T00:00:00.000Z",
    mockReviews: generateMockReviews("10", 7, 4.4)
  },
  {
    id: "11",
    name: "Yoga Mat",
    description: "Non-slip yoga mat for comfortable workouts.",
    price: 699,
    image: "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg",
    category: "fitness",
    rating: 4.3,
    reviewCount: 33,
    createdAt: "2024-03-15T00:00:00.000Z",
    mockReviews: generateMockReviews("11", 6, 4.3)
  },
  {
    id: "12",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with great sound.",
    price: 1299,
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg",
    category: "electronics",
    rating: 4.2,
    reviewCount: 29,
    createdAt: "2024-01-25T00:00:00.000Z",
    mockReviews: generateMockReviews("12", 5, 4.2)
  }
];