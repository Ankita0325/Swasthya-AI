// src/components/patient/PatientHeader.tsx
import React from 'react';
import { mainPatient } from '../../data/clinicalData';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export const PatientHeader: React.FC = () => {
  const getRiskVariant = (risk: string) => {
    if (risk === 'Low') return 'success';
    if (risk === 'Moderate') return 'warning';
    return 'error';
  };

  return (
    <Card style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: 800
            }}
          >
            {mainPatient.name[0]}
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {mainPatient.name}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              ID: {mainPatient.id} | Age: {mainPatient.age} | Gender: {mainPatient.gender} | Location: {mainPatient.location}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Badge variant={getRiskVariant(mainPatient.riskLevel)} style={{ fontSize: '14px', padding: '6px 14px' }}>
            {mainPatient.riskLevel} Clinical Risk
          </Badge>
          <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600 }}>
            📞 {mainPatient.phone}
          </div>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border)', margin: '20px 0' }} />

      {/* Vitals Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {mainPatient.vitals.map((v, i) => (
          <div
            key={i}
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1.5px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {v.name}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {v.value}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{v.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PatientHeader;
