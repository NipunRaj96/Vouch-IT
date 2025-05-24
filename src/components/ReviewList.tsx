import React from 'react';
import StarRating from './StarRating';
import { Review } from '../types';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }

  // Format date to a readable string
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get sentiment icon based on the sentiment
  const getSentimentIcon = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp size={16} className="text-green-500" />;
      case 'negative':
        return <ThumbsDown size={16} className="text-red-500" />;
      case 'neutral':
        return <Minus size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <StarRating rating={review.rating} size={18} />
              <span className="ml-2 text-gray-600 font-medium">
                {review.userName || 'Anonymous'}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(review.date)}
            </div>
          </div>
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-4 text-sm">
              <span className="mr-1">Sentiment:</span>
              {getSentimentIcon(review.sentiment)}
              <span className="ml-1 capitalize">{review.sentiment}</span>
            </div>
          </div>
          <p className="text-gray-800">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;