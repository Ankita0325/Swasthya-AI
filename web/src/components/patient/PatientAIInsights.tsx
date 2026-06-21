// src/components/patient/PatientAIInsights.tsx
import React from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';
import Card from '../ui/Card';

export const PatientAIInsights: React.FC = () => {
  return (
    <Card style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <Sparkles size={20} style={{ color: 'var(--accent)' }} />
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Graph-Propagated AI Insights
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Insight 1 */}
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--radius)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            display: 'flex',
            gap: '12px'
          }}
        >
          <div style={{ color: 'var(--accent)', marginTop: '2px' }}>
            <BrainCircuit size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
              Fatigue & Sleep Pattern Linkage
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              The system identified a risk correlation. Fatigue reports (3x this month) correspond directly to sleep quality logs (averaging 6 hours, poor quality) and sedentary indicators. Lack of deep sleep acts as a key multiplier.
            </p>
          </div>
        </div>

        {/* Insight 2 */}
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--radius)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            display: 'flex',
            gap: '12px'
          }}
        >
          <div style={{ color: 'var(--accent)', marginTop: '2px' }}>
            <BrainCircuit size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
              Metabolic & Genetic Risk Flag
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Patient exhibits prediabetic HbA1c (6.8%) alongside Stage 1 blood pressure (138/88 mmHg). When traversed against parent nodes (Mother: Prediabetes, Father: Hypertension), metabolic predisposition is highly correlated.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientAIInsights;
