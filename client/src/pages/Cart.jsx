import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, removeCartItem, updateCartItem } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState({ cartItems: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        const { data } = await getCart();
        setCart(data);
      } catch (err) {
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  const handleQtyChange = async (itemId, qty) => {
    setError('');
    try {
      const { data } = await updateCartItem(String(itemId), qty);
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update cart item');
    }
  };

  const handleRemove = async (itemId) => {
    setError('');
    try {
      const { data } = await removeCartItem(String(itemId));
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item');
    }
  };

  const items = cart?.cartItems || [];
  const itemsTotal = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.qty,
    0,
  );

  if (loading) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded shadow-sm p-4">
        <h1 className="text-xl font-bold mb-4 text-gray-800">My Cart ({items.length})</h1>
        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
            {error}
          </p>
        )}
        {items.length === 0 ? (
          <p className="text-gray-600">
            Your cart is empty.{' '}
            <Link to="/products" className="text-blue-600 underline">
              Shop now
            </Link>
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="flex gap-4 border-b pb-4">
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center">
                  {item.product && (
                    <img
                      src={item.product.mainImg}
                      alt={item.product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">
                    {item.product?.title || 'Product removed'}
                  </h2>
                  {item.size && (
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  )}
                  <p className="text-green-600 font-bold mt-1">
                    ₹{item.product?.price || 0}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center border rounded">
                      <button
                        type="button"
                        className="px-2 py-1"
                        onClick={() =>
                          handleQtyChange(String(item._id), Math.max(1, item.qty - 1))
                        }
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-l border-r">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        className="px-2 py-1"
                        onClick={() => handleQtyChange(String(item._id), item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(String(item._id))}
                      className="text-sm text-red-600 font-semibold"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded shadow-sm p-4 h-fit">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Price Details</h2>
        <div className="flex justify-between mb-2 text-sm">
          <span>Price ({items.length} items)</span>
          <span>₹{itemsTotal}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm">
          <span>Delivery Charges</span>
          <span className="text-green-600">FREE</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-bold mb-4">
          <span>Total Amount</span>
          <span>₹{itemsTotal}</span>
        </div>
        <button
          type="button"
          disabled={items.length === 0}
          onClick={() => navigate('/checkout')}
          className="w-full bg-[#fb641b] hover:bg-[#e55a15] disabled:bg-orange-300 text-white font-semibold py-2 rounded text-sm"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default Cart;

