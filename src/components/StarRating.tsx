import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
  animated?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 20,
  editable = false,
  onRatingChange,
  animated = false
}) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (animated) {
      setCurrentRating(0);
      const timer = setTimeout(() => {
        setCurrentRating(rating);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setCurrentRating(rating);
    }
  }, [rating, animated]);

  const handleClick = (selectedRating: number) => {
    if (editable && onRatingChange) {
      setCurrentRating(selectedRating);
      onRatingChange(selectedRating);
    }
  };

  const handleMouseEnter = (hoveredRating: number) => {
    if (editable) {
      setHoverRating(hoveredRating);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const displayRating = hoverRating || currentRating;
    const filled = starValue <= displayRating;
    const halfFilled = !filled && starValue - 0.5 <= displayRating;
    
    return (
      <span
        key={index}
        onClick={() => handleClick(starValue)}
        onMouseEnter={() => handleMouseEnter(starValue)}
        onMouseLeave={handleMouseLeave}
        className={`inline-block ${editable ? 'cursor-pointer' : ''} transition-all duration-300`}
        style={{ transform: animated && filled ? 'scale(1.1)' : 'scale(1)' }}
      >
        <Star
          size={size}
          className={`${
            filled
              ? 'text-yellow-500 fill-yellow-500'
              : halfFilled
              ? 'text-yellow-500 fill-yellow-500 opacity-50'
              : 'text-gray-300 fill-none'
          } transition-colors duration-300`}
        />
      </span>
    );
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => renderStar(index))}
    </div>
  );
};

export default StarRating;