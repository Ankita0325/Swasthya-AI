// src/components/dashboard/AlertsCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { mainPatient } from '../../data/clinicalData';
import Card from '../ui/Card';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 15 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 18,
      stiffness: 100
    }
  }
};

export const AlertsCard: React.FC = () => {
  return (
    <Card style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
        Priority Clinical Alerts
      </h3>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        {mainPatient.alerts.map((a) => (
          <motion.div
            key={a.id}
            variants={itemVariants}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius)',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: a.type === 'critical' || a.type === 'warning' ? '4px solid #EF4444' : '4px solid var(--accent)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: a.type === 'warning' ? '#D97706' : '#DC2626' }}>
                {a.type === 'warning' ? 'Pattern Triggered' : 'Vitals Alert'}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{a.date}</span>
            </div>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {a.message}
            </p>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Patient: {mainPatient.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Card>
  );
};

export default AlertsCard;
