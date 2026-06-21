// src/components/about/AboutHero.tsx
import React from 'react';

export const AboutHero: React.FC = () => {
  return (
    <div
      className="about-hero"
      style={{
        padding: '120px 24px 60px 24px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 16px 0', letterSpacing: '-1px' }}>
        Swasthya AI Platform Architecture
      </h1>
      <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
        An exploration of our 11-agent orchestrator, shared health memory graph database, and custom 3D body heatmap rendering.
      </p>

      <style>{`
        @media (max-width: 768px) {
          .about-hero {
            padding: 90px 16px 40px 16px !important;
          }
          .about-hero h1 {
            font-size: 30px !important;
            line-height: 1.25 !important;
            margin-bottom: 12px !important;
          }
          .about-hero p {
            font-size: 15px !important;
            line-height: 1.5 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutHero;
