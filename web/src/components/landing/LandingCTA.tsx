// src/components/landing/LandingCTA.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export const LandingCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto 100px auto',
        padding: '0 24px',
        zIndex: 5,
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg-secondary) 100%)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '60px 24px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          boxSizing: 'border-box'
        }}
      >
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
          Empower Your Practice Today
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 32px auto', lineHeight: 1.5 }}>
          Access our integrated database of patients, coordinate with smartwatch metrics, and make smart drug-interaction choices.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="md" onClick={() => navigate('/auth')}>
            Register Practice
          </Button>
          <Button variant="outline" size="md" onClick={() => navigate('/about')}>
            Read Architecture
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingCTA;
