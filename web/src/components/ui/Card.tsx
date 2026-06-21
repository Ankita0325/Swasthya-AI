// src/components/ui/Card.tsx
import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  className = '',
  style,
  ...props
}) => {
  const getStyles = () => {
    return {
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      boxShadow: 'var(--shadow)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      ...(hoverable && {
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: 'var(--shadow-lg)',
        }
      }),
      ...style,
    };
  };

  return (
    <div
      className={`ui-card ${className} ${hoverable ? 'hoverable-card' : ''}`}
      style={getStyles()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
