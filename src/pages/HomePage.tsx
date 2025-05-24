import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductsGrid from '../components/ProductsGrid';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [topRated, setTopRated] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      // Get featured products (first 4)
      setFeaturedProducts(mockProducts.slice(0, 4));
      
      // Get top rated products (sort by rating and take first 4)
      const sorted = [...mockProducts].sort((a, b) => b.rating - a.rating);
      setTopRated(sorted.slice(0, 4));
      
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero section */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-16">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative py-24 px-8 sm:px-12 lg:px-16 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Honest Reviews, Better Choices
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mb-8">
            Our AI-powered rating system analyzes thousands of consumer reviews to help you make informed decisions.
          </p>
          <Link 
            to="/products" 
            className="bg-white text-black font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Explore All Products
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
      
      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/products" className="text-black hover:underline inline-flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <ProductsGrid products={featuredProducts} isLoading={isLoading} />
      </section>
      
      {/* Top Rated Products */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Rated</h2>
          <Link to="/products" className="text-black hover:underline inline-flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <ProductsGrid products={topRated} isLoading={isLoading} />
      </section>
      
      {/* How It Works */}
      <section className="bg-gray-100 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-center mb-10">How Our Rating System Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="text-lg font-medium mb-2">User Reviews</h3>
            <p className="text-gray-600">Customers share their honest experiences with products</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="text-lg font-medium mb-2">AI Analysis</h3>
            <p className="text-gray-600">Our AI analyzes review sentiment to determine product quality</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 className="text-lg font-medium mb-2">Accurate Ratings</h3>
            <p className="text-gray-600">Products receive ratings based on real customer feedback</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;