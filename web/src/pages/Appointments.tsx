// src/pages/Appointments.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainPatient } from '../data/clinicalData';
import AppointmentQuestionPanel from '../components/appointments/AppointmentQuestionPanel';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  reason: string;
  status: 'Confirmed' | 'Pending';
}

export const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const [appointments] = useState<Appointment[]>([
    {
      id: "apt-1",
      patientName: mainPatient.name,
      patientId: mainPatient.id,
      date: "2026-06-25",
      time: "10:30 AM",
      reason: "Follow-up on HbA1c levels and chronic fatigue analysis.",
      status: "Confirmed"
    },
    {
      id: "apt-2",
      patientName: "Anjali Deshmukh",
      patientId: "p-3",
      date: "2026-06-26",
      time: "02:00 PM",
      reason: "Routine hypertension medication adjustment.",
      status: "Pending"
    }
  ]);

  const [expandedAptId, setExpandedAptId] = useState<string | null>("apt-1");

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
          Appointments Calendar
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
          Manage your schedule and prepare questionnaires for upcoming consultations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'start' }} className="appointments-grid-responsive">
        {/* Left Column: Appointments List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {appointments.map((apt) => {
            const isExpanded = expandedAptId === apt.id;
            return (
              <Card
                key={apt.id}
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--surface)',
                  border: isExpanded ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                  cursor: 'pointer'
                }}
                onClick={() => setExpandedAptId(isExpanded ? null : apt.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      👤 {apt.patientName}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      📅 {apt.date} | ⏰ {apt.time}
                    </span>
                  </div>
                  <Badge variant={apt.status === 'Confirmed' ? 'success' : 'warning'}>
                    {apt.status}
                  </Badge>
                </div>

                {isExpanded && (
                  <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fadeIn 0.2s ease-out' }}>
                    <div>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Clinical Context / Reason:</strong>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                        {apt.reason}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/patient/${apt.patientId}`);
                        }}
                      >
                        Open Health Ledger
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedAptId(null);
                        }}
                      >
                        Collapse Detail
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Right Column: Pre-Appointment Q&A Queue */}
        <div>
          {expandedAptId === 'apt-1' ? (
            <AppointmentQuestionPanel />
          ) : (
            <Card style={{ padding: '24px', backgroundColor: 'var(--surface)', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <span style={{ fontSize: '28px' }}>📅</span>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '12px 0 6px 0', color: 'var(--text-primary)' }}>
                Select Confirmed Appointment
              </h3>
              <p style={{ fontSize: '12px', margin: 0 }}>
                Choose an appointment from the list to manage pre-visit questionnaires.
              </p>
            </Card>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .appointments-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Appointments;