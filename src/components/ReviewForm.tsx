import React, { useState } from 'react';
import StarRating from './StarRating';
import { analyzeSentiment, isGeminiInitialized } from '../api/gemini';
import { initializeGeminiAPI } from '../api/gemini';

interface ReviewFormProps {
  productId: string;
  onReviewSubmit: (review: {
    rating: number;
    comment: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('AIzaSyAXEWhoRdDRjDJBTg9slzhGwMO696eTDHs');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please enter a review comment');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Initialize Gemini API if not already initialized
      if (!isGeminiInitialized()) {
        initializeGeminiAPI(apiKey);
      }

      // Analyze sentiment
      const sentiment = await analyzeSentiment(comment);

      // Submit the review
      onReviewSubmit({
        rating,
        comment,
        sentiment
      });

      // Reset form
      setRating(0);
      setComment('');
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <StarRating 
            rating={rating} 
            editable={true} 
            onRatingChange={setRating} 
            size={24}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="comment">
            Review
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Share your experience with this product"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-600 rounded text-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;