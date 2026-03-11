import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Orders</h1>
      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
          {error}
        </p>
      )}
      {orders.length === 0 ? (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                <span>
                  Order ID: <span className="font-mono">{order._id}</span>
                </span>
                <span>
                  Placed on:{' '}
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">Status: </span>
                {order.isDelivered ? (
                  <span className="text-green-600 font-semibold">Delivered</span>
                ) : (
                  <span className="text-orange-500 font-semibold">Processing</span>
                )}
              </div>
              <div className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">Ship to: </span>
                {order.shippingAddress?.address},{' '}
                {order.shippingAddress?.city},{' '}
                {order.shippingAddress?.postalCode},{' '}
                {order.shippingAddress?.country}
              </div>
              <div className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">Payment: </span>
                {order.paymentMethod}
              </div>
              <div className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">Items:</span>
                <ul className="list-disc ml-5 mt-1">
                  {order.orderItems.map((item) => (
                    <li key={item._id}>
                      {item.qty} x {item.product?.title || 'Product'} ({item.size || 'Std'})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 font-bold text-right text-lg text-gray-800">
                Total: ₹{order.totalPrice}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

