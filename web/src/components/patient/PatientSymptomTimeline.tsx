// src/components/patient/PatientSymptomTimeline.tsx
import React from 'react';
import { mainPatient } from '../../data/clinicalData';
import Card from '../ui/Card';

export const PatientSymptomTimeline: React.FC = () => {
  return (
    <Card style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
        Symptom History Ledger
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '16px' }}>
        {/* Timeline Line indicator */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            bottom: '8px',
            left: '4px',
            width: '2px',
            backgroundColor: 'var(--border)',
            zIndex: 1
          }}
        />

        {mainPatient.symptoms.map((s, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 5 }}>
            {/* Timeline Dot */}
            <div
              style={{
                position: 'absolute',
                left: '-16px',
                top: '6px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: s.severity >= 7 ? '#DC2626' : 'var(--accent)',
                border: '2px solid var(--surface)'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {s.symptom}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Severity Score:
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: s.severity >= 7 ? '#DC2626' : 'var(--text-primary)' }}>
                  {s.severity}/10
                </span>
                <div style={{ flex: 1, height: '4px', borderRadius: '2px', backgroundColor: 'var(--border)', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${s.severity * 10}%`,
                      backgroundColor: s.severity >= 7 ? '#DC2626' : 'var(--accent)'
                    }}
                  />
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                {s.notes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PatientSymptomTimeline;
