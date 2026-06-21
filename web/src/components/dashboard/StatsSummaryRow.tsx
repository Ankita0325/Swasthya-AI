// src/components/dashboard/StatsSummaryRow.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import Card from '../ui/Card';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 120
    }
  }
};

export const StatsSummaryRow: React.FC = () => {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Total Patients', value: '4', color: 'var(--accent)' },
    { label: 'Pending Appointments', value: '2', color: '#EAB308' },
    { label: 'Unresolved Alerts', value: '2', color: '#EF4444' },
    { label: 'Successful Recoveries', value: '142', color: '#10B981' }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', margin: '24px 0' }}
    >
      {stats.map((s, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: 'var(--surface)' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>{s.label}</span>
            <span style={{ fontSize: '28px', fontWeight: 900, color: s.color }}>{s.value}</span>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsSummaryRow;
