// src/components/ui/Badge.tsx
import React, { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  style,
  ...props
}) => {
  const getStyles = () => {
    let baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 10px',
      fontSize: '12px',
      fontWeight: 600,
      borderRadius: '20px',
      width: 'fit-content',
    };

    let variantStyles = {};
    if (variant === 'success') {
      variantStyles = {
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        color: '#16A34A',
      };
    } else if (variant === 'warning') {
      variantStyles = {
        backgroundColor: 'rgba(234, 179, 8, 0.15)',
        color: '#D97706',
      };
    } else if (variant === 'error') {
      variantStyles = {
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        color: '#DC2626',
      };
    } else if (variant === 'info') {
      variantStyles = {
        backgroundColor: 'var(--accent-light)',
        color: 'var(--accent)',
      };
    } else {
      variantStyles = {
        backgroundColor: 'var(--border)',
        color: 'var(--text-secondary)',
      };
    }

    return { ...baseStyles, ...variantStyles, ...style };
  };

  return (
    <span
      className={`ui-badge ${className}`}
      style={getStyles()}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
