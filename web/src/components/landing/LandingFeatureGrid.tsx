// src/components/landing/LandingFeatureGrid.tsx
import React from 'react';
import { GitBranch, Mic, Users, ShieldAlert, BadgePercent, GraduationCap } from 'lucide-react';
import Card from '../ui/Card';

const FEATURES = [
  {
    icon: <GitBranch size={24} style={{ color: 'var(--accent)' }} />,
    title: 'Health Memory Graph',
    description: 'Binds symptoms, lifestyle, habits, and medications into a single cohesive Neo4j health graph, tracing root connections.'
  },
  {
    icon: <Mic size={24} style={{ color: 'var(--accent)' }} />,
    title: 'Voice-First AI Onboarding',
    description: 'Enables patients to speak details naturally in English, Hindi, or Marathi via Sarvam AI, extracting structured graphs.'
  },
  {
    icon: <Users size={24} style={{ color: 'var(--accent)' }} />,
    title: 'Family Risk Tracing',
    description: 'Binds family records under a unified node to trace genetic and lifestyle risks without exposing private details.'
  },
  {
    icon: <ShieldAlert size={24} style={{ color: 'var(--accent)' }} />,
    title: 'Drug Conflict Checker',
    description: 'Integrates real-time OpenFDA queries to check for critical drug-drug conflicts instantly before prescriptions are saved.'
  },
  {
    icon: <BadgePercent size={24} style={{ color: 'var(--accent)' }} />,
    title: 'Jan Aushadhi Calculator',
    description: 'Compares branded medications with cheaper government-backed generic options, preparing a printable prescription.'
  },
  {
    icon: <GraduationCap size={24} style={{ color: 'var(--accent)' }} />,
    title: 'Scheme Verification',
    description: 'Scans and parses uploaded income certificates to match eligible health schemes automatically.'
  }
];

export const LandingFeatureGrid: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px 80px 24px',
        zIndex: 5,
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 12px 0', color: 'var(--text-primary)' }}>
          Clinical Intelligence Modules
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
          An integrated ecosystem of AI agents that monitor, analyze, and assist practice workflows.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          boxSizing: 'border-box'
        }}
      >
        {FEATURES.map((f, i) => (
          <Card
            key={i}
            hoverable
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '32px',
              height: '100%',
              boxSizing: 'border-box',
              backgroundColor: 'var(--surface)'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--accent-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {f.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {f.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingFeatureGrid;
