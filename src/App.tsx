import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  const handleSearch = (term: string) => {
    console.log('Searching for:', term);
    window.location.href = `/products?search=${encodeURIComponent(term)}`;
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar onSearch={handleSearch} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="*" element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
                <p>The page you're looking for does not exist.</p>
              </div>
            } />
          </Routes>
        </main>
        <footer className="bg-black text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Vouch-IT</h3>
                <p className="text-gray-400">
                  Our AI-powered product rating system helps you make better shopping decisions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="/products" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-400 mb-2">Email: nipunraj2004@gmail.com</p>
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Vouch-IT Product Ratings. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;