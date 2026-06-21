// src/components/about/FAQSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Card from '../ui/Card';

const FAQS = [
  {
    q: "What makes this different from a regular health chatbot?",
    a: "Unlike single-prompt chatbots that suffer from hallucination and lack explanation, Swasthya AI maps all patient logs to a structured Neo4j graph database. Insights are derived by traversing relationships (e.g. tracking specific symptom occurrences over time), making reasoning fully traceable."
  },
  {
    q: "Why a graph database instead of a normal database?",
    a: "Human health is highly interconnected. A relational database requires heavy, slow joins to connect symptoms, medication timings, family risk profiles, and lab reports. A graph database stores these connections directly as first-class relationships, enabling real-time risk propagation and family genetics tracing."
  },
  {
    q: "Does this provide medical diagnoses?",
    a: "No, Swasthya AI is a clinical assistant. It never makes unsupervised medical decisions. It extracts information, links relationships, matches government-approved eligibility rules, and flags severe patterns. It acts as an assistant for doctors, keeping them in control."
  },
  {
    q: "How does the voice feature work?",
    a: "It integrates Sarvam AI's speech API to handle transcription and text-to-speech rendering. Patients can click the mic button, speak naturally in Hindi, Marathi, or English, and the model will parse it into structured graph logs."
  },
  {
    q: "Is patient data shared within a family?",
    a: "Patient privacy is strictly enforced. While family members share a group code to track hereditary patterns, only non-sensitive risk indicators (like a family history of diabetes) propagate through relationships. Specific doctor consultations or logs remain strictly private."
  },
  {
    q: "What happens if a doctor asks something the system doesn't know?",
    a: "The Doctor Q&A agent intercepts the query. If the patient's record lacks the required data, the agent translates the clinical question into a patient-friendly prompt and queues it for the patient's next daily check-in, closing the loop automatically."
  }
];

export const FAQSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto 80px auto', padding: '0 24px', boxSizing: 'border-box' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px 0', textAlign: 'center' }}>
        Frequently Asked Questions
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>
        Common inquiries regarding Swasthya AI's architecture and security.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {FAQS.map((faq, idx) => {
          const isOpen = activeIdx === idx;
          return (
            <Card
              key={idx}
              hoverable
              style={{
                padding: '20px 24px',
                backgroundColor: 'var(--surface)',
                cursor: 'pointer',
                border: isOpen ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxSizing: 'border-box'
              }}
              onClick={() => setActiveIdx(isOpen ? null : idx)}
            >
              {/* Header Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 15 }}
                  style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                  <ChevronDown size={18} style={{ color: isOpen ? 'var(--accent)' : 'var(--text-secondary)' }} />
                </motion.div>
              </div>

              {/* Animated Expandable Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1,
                      transition: {
                        height: { type: "spring", stiffness: 150, damping: 18 },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: { type: "spring", stiffness: 150, damping: 18 },
                        opacity: { duration: 0.15 }
                      }
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div 
                      style={{ 
                        paddingTop: '16px', 
                        fontSize: '14px', 
                        color: 'var(--text-secondary)', 
                        lineHeight: 1.6, 
                        borderTop: '1px solid var(--border)', 
                        marginTop: '16px' 
                      }}
                    >
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
