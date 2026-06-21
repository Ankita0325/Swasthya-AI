// src/components/dashboard/DoctorProfileCard.tsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../ui/Card';

export const DoctorProfileCard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Card style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'var(--surface)' }}>
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-light)',
          color: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 800,
          border: '1.5px solid var(--accent)'
        }}
      >
        {user?.fullName?.[4] || user?.fullName?.[0] || 'D'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          {user?.fullName || 'Dr. Divya Sharma'}
        </h2>
        <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 700 }}>
          {user?.specialization || 'General Physician / Internal Medicine'}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          📍 {user?.timings || 'Mumbai'} | MCI-{user?.registrationNumber || '12345'}
        </span>
      </div>
    </Card>
  );
};

export default DoctorProfileCard;
