import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600">
        {error}
      </p>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8 bg-white rounded shadow-sm mt-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Profile</h1>
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Username:</span> {profile.username}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {profile.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {profile.usertype}
        </p>
      </div>
    </div>
  );
};

export default Profile;

