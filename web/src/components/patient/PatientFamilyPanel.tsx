// src/components/patient/PatientFamilyPanel.tsx
import React from 'react';
import { mainPatient } from '../../data/clinicalData';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export const PatientFamilyPanel: React.FC = () => {
  return (
    <Card style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
        Family Health Tracing
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {mainPatient.familyMembers.map((fm, idx) => (
          <div
            key={idx}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {fm.name} ({fm.relation})
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Shared genetic branch mapping
              </span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {fm.conditions.map((c, i) => (
                <Badge key={i} variant="warning">
                  ⚠️ {c}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PatientFamilyPanel;
