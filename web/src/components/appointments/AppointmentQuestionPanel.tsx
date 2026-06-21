// src/components/appointments/AppointmentQuestionPanel.tsx
import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

export const AppointmentQuestionPanel: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([
    "Have you noticed any shortness of breath when experiencing mid-day fatigue?",
    "Are you taking your Metformin doses consistently with meals?"
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setQuestions((prev) => [...prev, newQuestion.trim()]);
    setNewQuestion('');
  };

  const handleRemove = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <Card style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
        Pre-Appointment Check-In Questions
      </h3>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
        These questions will be asked by the AI agent during the patient's daily check-in loop prior to their appointment.
      </p>

      <form onSubmit={handleAddQuestion} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Input
          placeholder="e.g. Have you experienced any headaches after taking Lisinopril?"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          style={{ flex: 1 }}
        />
        <Button type="submit" variant="primary">Add Queue</Button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {questions.length === 0 ? (
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            No questions currently queued for this patient's next check-in.
          </div>
        ) : (
          questions.map((q, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)'
              }}
            >
              <span style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.4, fontWeight: 600 }}>
                &bull; {q}
              </span>
              <button
                onClick={() => handleRemove(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#EF4444',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px'
                }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default AppointmentQuestionPanel;
