import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <nav className="bg-[#2874f0] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 mr-4">
          <Link to="/" className="text-2xl font-bold text-white italic tracking-wider">
            Shop<span className="text-[#ffe500]">EZ</span>
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-grow max-w-2xl mx-6 relative hidden md:block">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full py-2 px-4 pr-10 rounded-sm focus:outline-none shadow-sm text-gray-800 text-sm h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-2.5 text-blue-500 hover:text-blue-700">
            <Search className="w-5 h-5 cursor-pointer" />
          </button>
        </form>

        {/* Right Links */}
        <div className="flex space-x-6 items-center text-white font-medium text-sm">
          <Link to="/products" className="hover:text-gray-200 hidden sm:inline">
            Products
          </Link>
          {!user && (
            <Link
              to="/login"
              className="bg-white text-[#2874f0] px-8 py-1 rounded-sm shadow-sm hover:bg-gray-50 transition border border-gray-100 font-bold h-8 flex items-center justify-center"
            >
              Login
            </Link>
          )}

          {user && (
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center space-x-1 hover:text-gray-200"
              >
                <User className="w-4 h-4" />
                <span>{user.username}</span>
              </Link>
              <Link
                to="/orders"
                className="hidden md:inline hover:text-gray-200"
              >
                My Orders
              </Link>
              {user.usertype === 'admin' && (
                <Link
                  to="/admin"
                  className="hidden md:inline hover:text-gray-200"
                >
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:text-gray-200 text-xs md:text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}

          <div className="hidden lg:flex items-center cursor-pointer hover:text-gray-200">
            <span>More</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </div>

          <Link to="/cart" className="hover:text-gray-200 flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
