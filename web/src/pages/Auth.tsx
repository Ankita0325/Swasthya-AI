// src/pages/Auth.tsx
import React, { useState } from 'react';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import ThemeToggle from '../components/common/ThemeToggle';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
        padding: '24px',
        boxSizing: 'border-box'
      }}
    >
      {/* Decorative Blur Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(4,116,252,0.15) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(4,116,252,0.1) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Floating Theme Toggle */}
      <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10 }}>
        <ThemeToggle />
      </div>

      {/* Auth Card Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          zIndex: 5,
          boxSizing: 'border-box',
          minHeight: '550px'
        }}
        className="auth-card-responsive"
      >
        {/* Left Side: Brand Panel */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0474FC 0%, #023c8a 100%)',
            color: '#FFFFFF',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
          className="auth-brand-panel"
        >
          {/* Subtle background mesh */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.1,
              background: 'radial-gradient(circle at 80% 20%, #ffffff 0%, transparent 60%)',
              pointerEvents: 'none'
            }}
          />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '0.5px' }}>Swasthya AI</span>
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px 0' }}>
              Healthcare that remembers.
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5, margin: 0 }}>
              AI-powered clinical insights, connected health memory mapping, and patient genetics tracking for modern practices.
            </p>
          </div>

          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
            &copy; 2026 Swasthya AI. Secure, encrypted practitioner hub.
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div
          style={{
            padding: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxSizing: 'border-box'
          }}
          className="auth-form-panel"
        >
          {isLogin ? (
            <SignIn onToggleForm={() => setIsLogin(false)} />
          ) : (
            <SignUp onToggleForm={() => setIsLogin(true)} />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-card-responsive {
            grid-template-columns: 1fr !important;
            max-width: 480px !important;
          }
          .auth-brand-panel {
            display: none !important;
          }
          .auth-form-panel {
            padding: 32px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Auth;