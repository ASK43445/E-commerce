import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart, getProductDetails } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setError('');
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const { data } = await getProductDetails(id);
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSize(data.sizes[0]);
        } else {
          setSize('');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setAdding(true);
    setError('');
    try {
      await addToCart(String(product._id), qty, size || undefined);
      navigate('/cart');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setAdding(true);
    setError('');
    try {
      await addToCart(String(product._id), qty, size || undefined);
      navigate('/checkout');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to continue');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600">
        {error}
      </p>
    );
  }

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white mt-4 rounded shadow-sm">
      <div className="flex flex-col items-center">
        <div className="w-full h-80 bg-gray-100 flex items-center justify-center mb-4">
          <img
            src={product.mainImg}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        {product.carousel && product.carousel.length > 0 && (
          <div className="flex space-x-2 overflow-x-auto">
            {product.carousel.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title} ${idx + 1}`}
                className="w-16 h-16 object-contain border rounded cursor-pointer hover:border-blue-500"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{product.category}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>

        <div className="mb-4">
          <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
          {product.discount > 0 && (
            <span className="ml-3 text-sm text-gray-500 line-through">
              ₹{Math.round(product.price / (1 - product.discount / 100))}
            </span>
          )}
        </div>

        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`px-3 py-1 border rounded text-sm ${size === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value) || 1)}
            className="w-24 border rounded px-2 py-1"
          />
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={adding}
          className="bg-[#fb641b] hover:bg-[#e55a15] disabled:bg-orange-300 text-white font-semibold py-3 px-6 rounded text-sm mr-4"
        >
          {adding ? 'Adding...' : 'ADD TO CART'}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={adding}
          className="bg-[#2874f0] hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded text-sm"
        >
          {adding ? 'Please wait...' : 'BUY NOW'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

