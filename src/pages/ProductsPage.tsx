import React, { useState, useEffect } from 'react';
import ProductsGrid from '../components/ProductsGrid';
import ProductFilter from '../components/ProductFilter';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home', label: 'Home & Kitchen' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'fitness', label: 'Fitness' },
  ];

  const priceRanges = [
    { value: '0-500', label: 'Under ₹500' },
    { value: '500-1000', label: '₹500 to ₹1000' },
    { value: '1000-2000', label: '₹1000 to ₹2000' },
    { value: '2000-5000', label: '₹2000 to ₹5000' },
    { value: '5000+', label: 'Over ₹5000' },
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleFilterChange = (filters: {
    category: string;
    priceRange: string;
    sortBy: string;
  }) => {
    let result = [...products];

    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-');
      if (max) {
        result = result.filter(
          product => product.price >= Number(min) && product.price <= Number(max)
        );
      } else {
        result = result.filter(product => product.price >= Number(min.replace('+', '')));
      }
    }

    switch (filters.sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600">Browse our collection of products with honest ratings</p>
      </div>
      
      <ProductFilter
        categories={categories}
        priceRanges={priceRanges}
        onFilterChange={handleFilterChange}
      />
      
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredProducts.length} products
      </div>
      
      <ProductsGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  );
};

export default ProductsPage;