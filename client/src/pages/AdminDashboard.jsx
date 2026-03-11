import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminConfig, getAdminOverview, updateAdminConfig } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [config, setConfig] = useState({ banner: '', categories: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.usertype !== 'admin') {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [overviewRes, configRes] = await Promise.all([
          getAdminOverview(),
          getAdminConfig(),
        ]);
        setOverview(overviewRes.data);
        setConfig({
          banner: configRes.data.banner || '',
          categories: configRes.data.categories || [],
        });
      } catch (err) {
        setError('Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateAdminConfig(config);
    } catch (err) {
      setError('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading admin dashboard...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>

      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded shadow-sm p-4">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">
              {overview.usersCount}
            </p>
          </div>
          <div className="bg-white rounded shadow-sm p-4">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-2xl font-bold text-gray-800">
              {overview.productsCount}
            </p>
          </div>
          <div className="bg-white rounded shadow-sm p-4">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">
              {overview.ordersCount}
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSaveConfig}
        className="bg-white rounded shadow-sm p-4 space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-800">Home Banner & Categories</h2>
        <div>
          <label className="block text-sm font-semibold mb-1">Banner Image URL</label>
          <input
            type="text"
            value={config.banner}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, banner: e.target.value }))
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Categories (comma separated)
          </label>
          <input
            type="text"
            value={config.categories.join(', ')}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                categories: e.target.value
                  .split(',')
                  .map((c) => c.trim())
                  .filter(Boolean),
              }))
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-[#2874f0] hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-2 px-6 rounded text-sm"
        >
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;

