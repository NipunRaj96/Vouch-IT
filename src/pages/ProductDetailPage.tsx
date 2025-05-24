import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { Product, Review } from '../types';
import { mockProducts } from '../data/mockData';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    setTimeout(() => {
      if (id) {
        const foundProduct = mockProducts.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.image);
          
          // Generate mock reviews
          const mockReviews = foundProduct.mockReviews || [];
          setReviews(mockReviews);
        }
      }
      
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleReviewSubmit = (review: {
    rating: number;
    comment: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }) => {
    if (!product) return;

    // Create a new review
    const newReview: Review = {
      id: `review-${Date.now()}`,
      productId: product.id,
      rating: review.rating,
      comment: review.comment,
      sentiment: review.sentiment,
      date: new Date().toISOString(),
      userName: 'You', // In a real app, this would be the logged-in user
    };

    // Add the review to the list
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Update the product rating
    const totalRatings = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
    const newAvgRating = totalRatings / updatedReviews.length;
    
    // Apply sentiment adjustment
    let sentimentAdjustment = 0;
    if (review.sentiment === 'positive') sentimentAdjustment = 0.2;
    if (review.sentiment === 'negative') sentimentAdjustment = -0.2;
    
    const adjustedRating = Math.min(Math.max(newAvgRating + sentimentAdjustment, 1), 5);
    
    setProduct({
      ...product,
      rating: parseFloat(adjustedRating.toFixed(1)),
      reviewCount: updatedReviews.length,
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for does not exist or has been removed.</p>
        <Link to="/products" className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition-colors">
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          </li>
          <li className="text-gray-500">/</li>
          <li>
            <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              <div 
                className={`aspect-square bg-gray-100 rounded cursor-pointer ${selectedImage === product.image ? 'ring-2 ring-black' : ''}`}
                onClick={() => setSelectedImage(product.image)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {product.gallery.map((image, index) => (
                <div 
                  key={index} 
                  className={`aspect-square bg-gray-100 rounded cursor-pointer ${selectedImage === image ? 'ring-2 ring-black' : ''}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <StarRating rating={product.rating} size={20} animated={true} />
            <span className="ml-2 text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>
          
          <p className="text-2xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {product.specs && product.specs.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Specifications</h2>
              <ul className="list-disc list-inside text-gray-700">
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-l"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center py-2 border-y border-gray-300"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-r"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors mb-4">
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Review Summary</h3>
            
            <div className="flex items-center mb-6">
              <div className="text-4xl font-bold mr-4">{product.rating.toFixed(1)}</div>
              <div>
                <StarRating rating={product.rating} size={24} />
                <p className="text-sm text-gray-600 mt-1">{product.reviewCount} reviews</p>
              </div>
            </div>
            
            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(r => Math.round(r.rating) === star).length;
                const percentage = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
                
                return (
                  <div key={star} className="flex items-center">
                    <span className="text-sm text-gray-600 w-8">{star} ★</span>
                    <div className="flex-1 mx-3 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Review List */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <ReviewList reviews={reviews} />
            </div>
            
            {/* Review Form */}
            <ReviewForm productId={product.id} onReviewSubmit={handleReviewSubmit} />
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mockProducts
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 4)
            .map(relatedProduct => (
              <Link 
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="group"
              >
                <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:underline">{relatedProduct.name}</h3>
                <div className="flex items-center mt-1">
                  <StarRating rating={relatedProduct.rating} size={14} />
                  <span className="ml-1 text-xs text-gray-500">({relatedProduct.reviewCount})</span>
                </div>
                <p className="mt-1 font-bold">${relatedProduct.price.toFixed(2)}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;