// src/pages/Profile.tsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <h1>Profile</h1>
      <div className="profile-card">
        <div className="profile-avatar-large">
          {user?.name?.[0] || 'D'}
        </div>
        <h2>{user?.name || 'Doctor'}</h2>
        <p>Phone: {user?.phoneNumber || 'Not provided'}</p>
        <p>Email: {user?.email || 'Not provided'}</p>
        <p>Role: {user?.role || 'Doctor'}</p>
      </div>
    </div>
  );
};

export default Profile;