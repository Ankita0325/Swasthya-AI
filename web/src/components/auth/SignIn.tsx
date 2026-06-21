// src/components/auth/SignIn.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface SignInProps {
  onToggleForm: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Phone number or email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(formData.identifier, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('skipLogin', 'true');
    navigate('/dashboard');
  };

  return (
    <div className={`auth-form-container ${shake ? 'shake' : ''}`} style={{ width: '100%' }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
        Sign In
      </h2>
      <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
        Access the Swasthya AI medical dashboard.
      </p>

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
        <Input
          label="Phone or Email"
          name="identifier"
          placeholder="e.g. 7559302315 or doctor@swasthya.com"
          value={formData.identifier}
          onChange={handleInputChange}
          error={errors.identifier}
          disabled={loading}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          disabled={loading}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          style={{ width: '100%', marginTop: '8px' }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', fontSize: '13px' }}>
        <button
          onClick={onToggleForm}
          style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', padding: 0 }}
        >
          Create an Account
        </button>
        <button
          onClick={handleSkip}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', padding: 0 }}
        >
          Skip Login &rarr;
        </button>
      </div>
    </div>
  );
};

export default SignIn;
