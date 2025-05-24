import React, { useState } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface ProductFilterProps {
  categories: FilterOption[];
  priceRanges: FilterOption[];
  onFilterChange: (filters: {
    category: string;
    priceRange: string;
    sortBy: string;
  }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  priceRanges,
  onFilterChange,
}) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  
  const applyFilters = () => {
    onFilterChange({
      category,
      priceRange,
      sortBy,
    });
  };
  
  const resetFilters = () => {
    setCategory('');
    setPriceRange('');
    setSortBy('featured');
    onFilterChange({
      category: '',
      priceRange: '',
      sortBy: 'featured',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setTimeout(applyFilters, 0);
            }}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <select
            id="priceRange"
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value);
              setTimeout(applyFilters, 0);
            }}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Any Price</option>
            {priceRanges.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setTimeout(applyFilters, 0);
            }}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="featured">Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 flex justify-end space-x-4 rounded-b-lg">
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;