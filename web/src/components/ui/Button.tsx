// src/components/ui/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  ...props
}) => {
  const getStyles = () => {
    let baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      borderRadius: 'var(--radius)',
      transition: 'all 0.15s ease',
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      opacity: props.disabled ? 0.6 : 1,
      border: 'none',
    };

    let variantStyles = {};
    if (variant === 'primary') {
      variantStyles = {
        backgroundColor: 'var(--accent)',
        color: 'var(--bg)',
      };
    } else if (variant === 'secondary') {
      variantStyles = {
        backgroundColor: 'var(--accent-light)',
        color: 'var(--text-primary)',
      };
    } else if (variant === 'outline') {
      variantStyles = {
        backgroundColor: 'transparent',
        border: '1.5px solid var(--border)',
        color: 'var(--text-primary)',
      };
    } else if (variant === 'danger') {
      variantStyles = {
        backgroundColor: '#EF4444',
        color: '#FFFFFF',
      };
    } else if (variant === 'ghost') {
      variantStyles = {
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
      };
    }

    let sizeStyles = {};
    if (size === 'sm') {
      sizeStyles = {
        padding: '6px 12px',
        fontSize: '13px',
      };
    } else if (size === 'md') {
      sizeStyles = {
        padding: '10px 18px',
        fontSize: '14px',
      };
    } else if (size === 'lg') {
      sizeStyles = {
        padding: '12px 24px',
        fontSize: '16px',
      };
    }

    return { ...baseStyles, ...variantStyles, ...sizeStyles, ...style };
  };

  return (
    <button
      className={`ui-button ${className}`}
      style={getStyles()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
