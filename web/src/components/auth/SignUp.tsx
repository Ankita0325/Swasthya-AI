// src/components/auth/SignUp.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface SignUpProps {
  onToggleForm: () => void;
}

const SPECIALIZATIONS = [
  "Cardiologist",
  "Dermatologist",
  "General Physician",
  "Dentist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Psychiatrist",
  "Radiologist",
  "Surgeon",
  "Ophthalmologist",
  "ENT Specialist",
  "Gynecologist",
  "Neurologist",
  "Oncologist",
  "Urologist",
  "Anesthesiologist",
  "Pathologist",
  "Emergency Medicine",
  "Family Medicine",
  "Internal Medicine"
];

export const SignUp: React.FC<SignUpProps> = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shake, setShake] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    medicalRegNumber: '',
    specialization: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.medicalRegNumber.trim()) {
      newErrors.medicalRegNumber = 'Medical registration number is required';
    }
    if (!formData.specialization) {
      newErrors.specialization = 'Please select a specialization';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      } else {
        triggerShake();
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      } else {
        triggerShake();
      }
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep((prev) => prev - 1);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 3) return;

    setLoading(true);
    setError('');

    try {
      await signup({
        fullName: formData.fullName,
        phoneNumber: formData.mobileNumber,
        email: formData.email,
        password: formData.password,
        medicalRegNumber: formData.medicalRegNumber,
        specialization: formData.specialization
      });
      // Signup successful, redirect or ask to login
      alert('Verification pending. Please Sign In.');
      onToggleForm();
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check details.');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-form-container ${shake ? 'shake' : ''}`} style={{ width: '100%' }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
        Create Account
      </h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: '4px',
              backgroundColor: s <= step ? 'var(--accent)' : 'var(--border)',
              borderRadius: '2px',
              transition: 'background-color 0.2s'
            }}
          />
        ))}
      </div>

      {error && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: '#DC2626',
          padding: '12px',
          borderRadius: 'var(--radius)',
          fontSize: '14px',
          fontWeight: 500,
          marginBottom: '20px',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {step === 1 && (
          <>
            <Input
              label="Full Name"
              name="fullName"
              placeholder="Dr. Divya Sharma"
              value={formData.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
              disabled={loading}
            />
            <Input
              label="Mobile Number"
              name="mobileNumber"
              placeholder="e.g. 9820098200"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              error={errors.mobileNumber}
              disabled={loading}
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="doctor@swasthya.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              disabled={loading}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              disabled={loading}
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              disabled={loading}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Input
              label="Medical Registration Number"
              name="medicalRegNumber"
              placeholder="e.g. MCI-12345"
              value={formData.medicalRegNumber}
              onChange={handleInputChange}
              error={errors.medicalRegNumber}
              disabled={loading}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Specialization
              </label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontSize: '14px',
                  borderRadius: 'var(--radius)',
                  border: errors.specialization ? '1.5px solid #EF4444' : '1.5px solid var(--border)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
                disabled={loading}
              >
                <option value="">Select Specialization</option>
                {SPECIALIZATIONS.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
              {errors.specialization && (
                <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: 500 }}>
                  {errors.specialization}
                </span>
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--bg-secondary)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700 }}>Review Registration Details</h4>
            <div><strong>Full Name:</strong> {formData.fullName}</div>
            <div><strong>Mobile:</strong> {formData.mobileNumber}</div>
            <div><strong>Email:</strong> {formData.email}</div>
            <div><strong>Reg Number:</strong> {formData.medicalRegNumber}</div>
            <div><strong>Specialization:</strong> {formData.specialization}</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={loading}
              style={{ flex: 1 }}
            >
              Back
            </Button>
          )}

          {step < 3 ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              style={{ flex: 1 }}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? 'Registering...' : 'Submit & Register'}
            </Button>
          )}
        </div>
      </form>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', fontSize: '13px' }}>
        <button
          onClick={onToggleForm}
          style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', padding: 0 }}
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
