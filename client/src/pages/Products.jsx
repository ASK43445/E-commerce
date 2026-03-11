import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await getProducts(searchTerm);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600">
        {error}
      </p>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded shadow-sm p-6 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">All Products</h1>
          <p className="text-gray-600 mb-4">
            No products found. Your database is empty right now.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-800">
            <p className="font-semibold mb-2">Add demo products (recommended)</p>
            <p>Run this in a terminal:</p>
            <pre className="mt-2 bg-black text-white p-3 rounded overflow-x-auto">
              {`cd server
npm run seed`}
            </pre>
            <p className="mt-2">
              Then refresh this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {searchTerm ? `Search Results for "${searchTerm}"` : 'All Products'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="bg-white rounded shadow-sm hover:shadow-md transition overflow-hidden flex flex-col block"
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img
                src={product.mainImg}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="font-semibold text-gray-800 mb-1 truncate">{product.title}</h2>
              <p className="text-sm text-gray-500 mb-2 truncate">{product.category}</p>
              <p className="text-lg font-bold text-green-600 mb-4">
                ₹{product.price}
                {product.discount > 0 && (
                  <span className="ml-2 text-xs text-gray-500 line-through">
                    ₹{Math.round(product.price / (1 - product.discount / 100))}
                  </span>
                )}
              </p>
              <span className="mt-auto inline-block text-center bg-[#2874f0] text-white py-2 px-4 rounded hover:bg-blue-600 transition text-sm font-semibold">
                Shop Now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;

