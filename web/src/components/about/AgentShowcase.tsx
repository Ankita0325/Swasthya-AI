// src/components/about/AgentShowcase.tsx
import React, { useState } from 'react';
import Card from '../ui/Card';

const AGENTS = [
  { num: "01", name: "Onboarding Agent", role: "Extracts initial conditions, family history, and allergies via multi-turn conversations, writing the first graph nodes." },
  { num: "02", name: "Check-In Agent", role: "Constructs 2-3 tailored daily questions from the patient's active symptom history, checking updates." },
  { num: "03", name: "Sarvam Chat Agent", role: "Handles speech-to-text and text-to-speech rendering, supporting voice interactions in multiple languages." },
  { num: "04", name: "Escalation Agent", role: "Watches for critical danger symptom clusters (e.g. chest pain) using strict rules, alerting the physician." },
  { num: "05", name: "Family Genetics Agent", role: "Traverses family branches of the health graph to trace inherited conditions and calculate risk percentages." },
  { num: "06", name: "Medical Scan Agent", role: "Parses documents, verifying income certificates for government health insurance eligibility." },
  { num: "07", name: "Medicine Reminder Agent", role: "Schedules dose alerts and checks drug-drug conflicts before saving reminders." },
  { num: "08", name: "Smartwatch Risk Agent", role: "Syncs wearable metrics (Heart Rate, SpO2, Blood Pressure) directly into graph calculations." },
  { num: "09", name: "Doctor Q&A Agent", role: "Answers physician inquiries using graph data, or queues follow-up questions for the patient's next check-in." },
  { num: "10", name: "Appointment Automator", role: "Coordinates scheduling, matching patient constraints with doctor calendars." },
  { num: "11", name: "Workflow Orchestrator", role: "The central supervisor managing multi-step background pipelines through Render Workflows." }
];

export const AgentShowcase: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="agent-showcase-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 60px 24px', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px 0', textAlign: 'center' }}>
        The 11-Agent Mesh
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>
        Instead of a single brittle chatbot, Swasthya AI coordinates 11 dedicated agents. Scroll horizontally to inspect nodes.
      </p>

      {/* Horizontally scrollable flex container */}
      <div 
        className="agent-scroll-container"
        style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          overflowX: 'auto', 
          gap: '20px', 
          padding: '12px 4px 24px 4px',
          scrollBehavior: 'smooth',
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          boxSizing: 'border-box'
        }}
      >
        {AGENTS.map((a, idx) => (
          <div 
            key={idx} 
            className="agent-card-wrapper"
            style={{ 
              flex: '0 0 280px', // Prevent shrinking, maintain fixed width
              boxSizing: 'border-box'
            }}
          >
            <Card
              hoverable
              onClick={() => setSelected(selected === idx ? null : idx)}
              style={{
                padding: '24px',
                backgroundColor: 'var(--surface)',
                border: selected === idx ? '1px solid var(--accent)' : '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                height: '100%',
                boxShadow: selected === idx ? 'var(--shadow-lg)' : 'var(--shadow)',
                transform: selected === idx ? 'translateY(-4px)' : 'none',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--accent-light)', backgroundImage: 'linear-gradient(135deg, var(--accent) 0%, transparent 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {a.num}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
                  Agentic Node
                </span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {a.name}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {a.role}
              </p>
            </Card>
          </div>
        ))}
      </div>

      <style>{`
        /* Scrollbar styles for the agent scroll view */
        .agent-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: var(--accent) transparent;
          -webkit-overflow-scrolling: touch;
        }
        
        .agent-scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        
        .agent-scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .agent-scroll-container::-webkit-scrollbar-thumb {
          background-color: var(--accent);
          border-radius: 99px;
          opacity: 0.3;
        }
        
        [data-theme="dark"] .agent-scroll-container::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .agent-showcase-container {
            padding: 0 16px 40px 16px !important;
          }
          .agent-scroll-container {
            width: 100% !important;
            max-width: 100% !important;
          }
          .agent-card-wrapper {
            flex: 0 0 250px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AgentShowcase;
