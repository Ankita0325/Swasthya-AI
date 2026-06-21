// src/components/common/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Button from '../ui/Button';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSkipLogin = localStorage.getItem('skipLogin') === 'true';

  return (
    <nav
      style={{
        position: 'fixed',
        top: scrolled ? '12px' : '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: scrolled ? 'calc(100% - 64px)' : 'calc(100% - 48px)',
        maxWidth: '1200px',
        height: scrolled ? '60px' : '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: 'var(--navbar-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border)',
        borderRadius: scrolled ? '16px' : '24px',
        boxShadow: scrolled ? 'var(--shadow-lg)' : 'var(--shadow)',
        boxSizing: 'border-box'
      }}
    >
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: 'var(--text-primary)',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '0.5px' }}>Swasthya AI</span>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: location.pathname === '/' ? 'var(--accent)' : 'var(--text-secondary)',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '4px 8px'
          }}
        >
          Home
        </button>
        <button
          onClick={() => navigate('/about')}
          style={{
            background: 'none',
            border: 'none',
            color: location.pathname === '/about' ? 'var(--accent)' : 'var(--text-secondary)',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '4px 8px'
          }}
        >
          About Platform
        </button>
      </div>

      {/* Right Side: Theme Toggle & Portal Access */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ThemeToggle />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(isSkipLogin ? '/dashboard' : '/auth')}
        >
          Doctor Hub &rarr;
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;