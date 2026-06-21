// src/components/about/AboutBodyModelSection.tsx
import React from 'react';
import PatientBodyModel, { HeatPoint } from '../patient/PatientBodyModel';

const SAMPLE_HEATPOINTS: HeatPoint[] = [
  {
    id: "head",
    label: "Cranial & Neurological",
    description: "Tracks headaches, dizziness, and cognitive fatigue.",
    position: [0, 1.8, 0],
    color: "#EAB308", // Yellow
    intensity: 0.7
  },
  {
    id: "chest",
    label: "Chest & Heart",
    description: "Monitors chest pain, pressure, and respiratory symptoms.",
    position: [0, 1.3, 0.1],
    color: "#EF4444", // Red
    intensity: 0.9
  },
  {
    id: "abdomen",
    label: "Abdomen & Metabolic",
    description: "Tracks core digestive complaints and localized visceral pain.",
    position: [0, 0.9, 0.1],
    color: "#10B981", // Green
    intensity: 0.5
  }
];

export const AboutBodyModelSection: React.FC = () => {
  return (
    <div className="body-model-section-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 60px 24px', boxSizing: 'border-box' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }} className="body-section-responsive">
        {/* Left Side: Explanatory Text */}
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
            Visual Symptom Mapping
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 24px 0' }}>
            Swasthya AI implements an interactive 3D symptom heatmap. When patients report discomfort through their daily check-in or voice chat, the system maps the locations onto a Neo4j health graph.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
                1
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Natural Extraction:</strong> Symptoms are parsed from patient speech dynamically.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#EAB308', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
                2
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>3D Heat Rendering:</strong> Frequency and severity translate to color weights on the shader.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
                3
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Interactivity:</strong> Doctors can orbit, zoom, and click points directly to inspect logs.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive 3D Canvas */}
        <div>
          <PatientBodyModel heatPoints={SAMPLE_HEATPOINTS} height="450px" />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .body-model-section-container {
            padding: 0 16px 40px 16px !important;
          }
          .body-section-responsive {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .body-section-responsive h2 {
            font-size: 26px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutBodyModelSection;
