import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-green-600 transition-colors">{product.name}</h3>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
          <div className="flex items-center">
            <StarRating rating={product.rating} size={16} />
            <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{product.description}</p>
      </div>
    </Link>
  );
};

export default ProductCard;