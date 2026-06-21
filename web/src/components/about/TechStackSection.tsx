// src/components/about/TechStackSection.tsx
import React from 'react';
import Card from '../ui/Card';

const TECHS = [
  { category: 'Frontend', items: ['React + Vite', 'React Native (Expo)', 'Three.js / Fiber'] },
  { category: 'Backend / Data', items: ['FastAPI', 'Neo4j AuraDB', 'Supabase (PostgreSQL)'] },
  { category: 'AI Models', items: ['Sarvam AI (TTS/STT)', 'Groq (LLaMA-3)', 'Render Workflows'] },
  { category: 'Clinical APIs', items: ['OpenFDA Database', 'Janaushadhi Directory', 'Govt Schemes Matcher'] }
];

export const TechStackSection: React.FC = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 60px 24px', boxSizing: 'border-box' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 32px 0', textAlign: 'center' }}>
        Core Technologies
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {TECHS.map((t, idx) => (
          <Card 
            key={idx} 
            hoverable
            style={{ 
              padding: '24px', 
              backgroundColor: 'var(--surface)', 
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              {t.category}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px' }}>
              {t.items.map((item, i) => (
                <span
                  key={i}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '99px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TechStackSection;
