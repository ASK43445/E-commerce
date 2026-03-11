import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart, createOrder, getCart } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const [cart, setCart] = useState({ cartItems: [] });
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
        if (!data.cartItems || data.cartItems.length === 0) {
          navigate('/cart');
          return;
        }
        setCart(data);
      } catch (err) {
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  const items = cart?.cartItems || [];
  const itemsTotal = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.qty,
    0,
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const orderItems = items.map((item) => ({
        product: item.product._id,
        qty: item.qty,
        price: item.product.price,
        size: item.size,
      }));

      await createOrder({
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice: itemsTotal,
      });

      await clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading checkout...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <form
        onSubmit={submitHandler}
        className="md:col-span-2 bg-white rounded shadow-sm p-4 space-y-4"
      >
        <h1 className="text-xl font-bold mb-2 text-gray-800">Delivery Address</h1>

        {error && (
          <p className="mb-2 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <div>
          <label className="block text-sm font-semibold mb-1">Address</label>
          <input
            type="text"
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress((prev) => ({ ...prev, address: e.target.value }))
            }
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">City</label>
            <input
              type="text"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress((prev) => ({ ...prev, city: e.target.value }))
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Postal Code</label>
            <input
              type="text"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress((prev) => ({ ...prev, postalCode: e.target.value }))
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Country</label>
          <input
            type="text"
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress((prev) => ({ ...prev, country: e.target.value }))
            }
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Payment Method</h2>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMethod === 'UPI'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>UPI / Wallets</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="Card"
                checked={paymentMethod === 'Card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Credit / Debit Card</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 bg-[#fb641b] hover:bg-[#e55a15] disabled:bg-orange-300 text-white font-semibold py-2 px-6 rounded text-sm"
        >
          {submitting ? 'Placing Order...' : 'PLACE ORDER'}
        </button>
      </form>

      <div className="bg-white rounded shadow-sm p-4 h-fit">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>
        <div className="space-y-2 text-sm mb-4">
          {items.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span className="truncate mr-2">
                {item.product?.title} x {item.qty}
              </span>
              <span>₹{(item.product?.price || 0) * item.qty}</span>
            </div>
          ))}
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{itemsTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

