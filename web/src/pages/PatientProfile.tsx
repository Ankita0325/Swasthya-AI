// src/pages/PatientProfile.tsx
import React, { useState } from 'react';
import { mainPatient } from '../data/clinicalData';
import PatientHeader from '../components/patient/PatientHeader';
import PatientBodyModel, { HeatPoint } from '../components/patient/PatientBodyModel';
import PatientHealthGraph from '../components/patient/PatientHealthGraph';
import PatientRiskTrend from '../components/patient/PatientRiskTrend';
import PatientSymptomTimeline from '../components/patient/PatientSymptomTimeline';
import PatientFamilyPanel from '../components/patient/PatientFamilyPanel';
import PatientAIInsights from '../components/patient/PatientAIInsights';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

// Indresh Suresh's actual clinical hotspots mapping
const INDRESH_HEATPOINTS: HeatPoint[] = [
  {
    id: "head",
    label: "Head & Cranial",
    description: "Localized frontal headache, severity 5/10 logged.",
    position: [0, 1.8, 0],
    color: "#EAB308", // Yellow
    intensity: 0.6
  },
  {
    id: "back",
    label: "Adrenal & Lower Back",
    description: "High recurring fatigue (3 logs this month, severity 7/10).",
    position: [0, 0.8, -0.15],
    color: "#EF4444", // Red
    intensity: 0.85
  }
];

export const PatientProfile: React.FC = () => {
  const [qaQuery, setQaQuery] = useState('');
  const [qaAnswer, setQaAnswer] = useState<string | null>(null);
  const [isQueued, setIsQueued] = useState(false);

  const handleQaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaQuery.trim()) return;

    const query = qaQuery.toLowerCase();
    
    // Semantic answer matching
    if (query.includes('fatigue') || query.includes('tired') || query.includes('exhausted')) {
      setQaAnswer("Indresh's fatigue is closely coupled with late sleeping habits (retires past 1:30 AM) and insufficient sleep duration (6 hours average). Critically, Vitamin D3 levels are severely deficient (18 ng/mL), acting as a physiological metabolic blocker.");
      setIsQueued(false);
    } else if (query.includes('sugar') || query.includes('diabetes') || query.includes('hba1c') || query.includes('glucose')) {
      setQaAnswer("HbA1c stands at 6.8% (glycemic load in diabetic threshold). Indresh takes Metformin 500mg daily. Prediabetes is genetic (Mother: prediabetic). High desk screen time (10+ hrs) and sedentary behaviors are major lifestyle factors.");
      setIsQueued(false);
    } else if (query.includes('bp') || query.includes('blood pressure') || query.includes('hypertension')) {
      setQaAnswer("Blood pressure is elevated at 138/88 mmHg. Indresh takes Lisinopril 10mg daily for pressure regulation. Parent nodes indicate Father has documented hypertension.");
      setIsQueued(false);
    } else {
      setQaAnswer(null);
      setIsQueued(true);
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
      
      {/* Header and Vitals row */}
      <PatientHeader />

      {/* Main Profile Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }} className="patient-grid-responsive">
        
        {/* Left Column: Graphs, Models & QA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Force Graph */}
          <PatientHealthGraph />

          {/* Doctor QA Panel */}
          <Card style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
              Doctor Q&A Agent Loop
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
              Query the patient's records. Unresolvable clinical questions are queued for the patient's next check-in.
            </p>

            <form onSubmit={handleQaSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <Input
                placeholder="Ask about fatigue, blood pressure, sugar, etc."
                value={qaQuery}
                onChange={(e) => setQaQuery(e.target.value)}
                style={{ flex: 1 }}
              />
              <Button type="submit" variant="primary">Ask Agent</Button>
            </form>

            {qaAnswer && (
              <div style={{ padding: '16px', borderRadius: 'var(--radius)', backgroundColor: 'var(--accent-light)', borderLeft: '4px solid var(--accent)', fontSize: '14px', lineHeight: 1.5, color: 'var(--text-primary)', animation: 'fadeIn 0.2s ease-out' }}>
                💡 <strong>Agent response:</strong> {qaAnswer}
              </div>
            )}

            {isQueued && (
              <div style={{ padding: '16px', borderRadius: 'var(--radius)', backgroundColor: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #EAB308', fontSize: '14px', lineHeight: 1.5, color: 'var(--text-primary)', animation: 'fadeIn 0.2s ease-out' }}>
                ⏳ <strong>Loop queued:</strong> The system doesn't have this record yet. A patient-friendly question has been queued for Indresh's next daily check-in check.
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Timelines, Families & Meds */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Risk Trend Chart */}
          <PatientRiskTrend />

          {/* 3D Symptom Model mapping (tall/narrow right placement) */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
              Dynamic Symptom Heatmap
            </h3>
            <PatientBodyModel heatPoints={INDRESH_HEATPOINTS} height="550px" />
          </div>

          {/* Active Medications list */}
          <Card style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
              Active Medications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {mainPatient.medications.map((med, i) => (
                <div key={i} style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  💊 {med}
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights summaries */}
          <PatientAIInsights />

          {/* Symptoms Timeline list */}
          <PatientSymptomTimeline />

          {/* Family Genetics risk panel */}
          <PatientFamilyPanel />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .patient-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PatientProfile;
