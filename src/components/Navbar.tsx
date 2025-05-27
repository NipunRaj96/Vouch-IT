import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';

interface NavbarProps {
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 font-bold text-xl tracking-tighter hover:text-green-400 transition-colors">
              Vouch-IT
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-8">
                <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors">
                  Home
                </Link>
                <Link to="/products" className="text-gray-300 hover:text-green-400 transition-colors">
                  Products
                </Link>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/nipunkumar01/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/NipunRaj96" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://nipun.framer.website/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors"
              >
                Portfolio
              </a>
            </div>
            <Link to="/cart" className="relative p-2 group">
              <ShoppingCart className="h-6 w-6 text-gray-300 group-hover:text-green-400 transition-colors" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-500 rounded-full">
                0
              </span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-green-400 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 text-gray-300 hover:text-green-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block px-3 py-2 text-gray-300 hover:text-green-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <div className="border-t border-gray-700 mt-2 pt-2">
              <a 
                href="https://www.linkedin.com/in/nipunkumar01/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-gray-300 hover:text-green-400 transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/NipunRaj96"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-gray-300 hover:text-green-400 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://nipun.framer.website/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-gray-300 hover:text-green-400 transition-colors"
              >
                Portfolio
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;