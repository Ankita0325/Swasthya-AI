// src/components/dashboard/PatientScanCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export const PatientScanCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
          <QrCode size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Scan Patient ID
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
            Load medical graphs instantly via QR/ID
          </p>
        </div>
      </div>
      <Button
        variant="primary"
        onClick={() => navigate('/scanner')}
        style={{ width: '100%' }}
      >
        Open Scanner
      </Button>
    </Card>
  );
};

export default PatientScanCard;
