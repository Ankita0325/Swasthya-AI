// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DoctorProfileCard from '../components/dashboard/DoctorProfileCard';
import StatsSummaryRow from '../components/dashboard/StatsSummaryRow';
import PatientScanCard from '../components/dashboard/PatientScanCard';
import PatientListCard from '../components/dashboard/PatientListCard';
import AlertsCard from '../components/dashboard/AlertsCard';
import Card from '../components/ui/Card';
import ThemeToggle from '../components/common/ThemeToggle';

// Skeleton Loader card mimicking profile shape with premium shimmer
const SkeletonProfileCard = () => (
  <Card style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center', backgroundColor: 'var(--surface)' }}>
    <div className="shimmer-bg" style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
      <div className="shimmer-bg" style={{ height: '18px', width: '40%', borderRadius: '4px' }} />
      <div className="shimmer-bg" style={{ height: '13px', width: '60%', borderRadius: '4px' }} />
      <div className="shimmer-bg" style={{ height: '11px', width: '30%', borderRadius: '4px' }} />
    </div>
  </Card>
);

// Skeleton for stats row
const SkeletonStatsRow = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', margin: '24px 0' }}>
    {[1, 2, 3, 4].map((i) => (
      <Card key={i} style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--surface)' }}>
        <div className="shimmer-bg" style={{ height: '12px', width: '60%', borderRadius: '3px' }} />
        <div className="shimmer-bg" style={{ height: '28px', width: '30%', borderRadius: '4px' }} />
      </Card>
    ))}
  </div>
);

// Skeleton for patient list
const SkeletonPatientList = () => (
  <Card style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
    <div className="shimmer-bg" style={{ height: '18px', width: '30%', borderRadius: '4px', marginBottom: '16px' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="shimmer-bg" style={{ height: '56px', width: '100%', borderRadius: 'var(--radius)' }} />
      ))}
    </div>
  </Card>
);

// Skeleton for scanner
const SkeletonScanCard = () => (
  <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--surface)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div className="shimmer-bg" style={{ width: '44px', height: '44px', borderRadius: '12px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        <div className="shimmer-bg" style={{ height: '14px', width: '50%', borderRadius: '3px' }} />
        <div className="shimmer-bg" style={{ height: '11px', width: '70%', borderRadius: '3px' }} />
      </div>
    </div>
    <div className="shimmer-bg" style={{ height: '40px', width: '100%', borderRadius: 'var(--radius)' }} />
  </Card>
);

// Skeleton for alerts
const SkeletonAlertsCard = () => (
  <Card style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
    <div className="shimmer-bg" style={{ height: '18px', width: '40%', borderRadius: '4px', marginBottom: '16px' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[1, 2].map((i) => (
        <div key={i} className="shimmer-bg" style={{ height: '70px', width: '100%', borderRadius: 'var(--radius)' }} />
      ))}
    </div>
  </Card>
);

// Framer Motion staggered variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 24,
      stiffness: 110
    }
  }
};

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate query loading effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        padding: '32px',
        maxWidth: '1200px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {/* Title Header with Dashboard Theme Button */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '32px',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '20px'
        }}
        className="dashboard-header-responsive"
      >
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
            Practice Overview
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
            Manage your patients, review health graphs, and scan diagnostic markers.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Theme
          </span>
          <ThemeToggle />
        </div>
      </div>

      {isLoading ? (
        // Premium shimmering skeletons grid
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
            alignItems: 'start'
          }}
          className="dashboard-grid-responsive"
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SkeletonProfileCard />
            <SkeletonStatsRow />
            <SkeletonPatientList />
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SkeletonScanCard />
            <SkeletonAlertsCard />
          </div>
        </div>
      ) : (
        // Physics staggered animation entry container
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
            alignItems: 'start'
          }}
          className="dashboard-grid-responsive"
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <motion.div variants={itemVariants}>
              <DoctorProfileCard />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatsSummaryRow />
            </motion.div>

            <motion.div variants={itemVariants}>
              <PatientListCard />
            </motion.div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <motion.div variants={itemVariants}>
              <PatientScanCard />
            </motion.div>

            <motion.div variants={itemVariants}>
              <AlertsCard />
            </motion.div>
          </div>
        </motion.div>
      )}

      <style>{`
        /* Premium shimmering animation style */
        .shimmer-bg {
          position: relative;
          overflow: hidden;
          background-color: var(--border) !important;
        }
        
        .shimmer-bg::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.15) 20%,
            rgba(255, 255, 255, 0.3) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer-pulse 2s infinite;
          content: '';
        }
        
        [data-theme="dark"] .shimmer-bg::after {
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.04) 20%,
            rgba(255, 255, 255, 0.1) 60%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        
        @keyframes shimmer-pulse {
          100% {
            transform: translateX(100%);
          }
        }
        
        @media (max-width: 900px) {
          .dashboard-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .dashboard-header-responsive {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;