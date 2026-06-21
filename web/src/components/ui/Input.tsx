// src/components/ui/Input.tsx
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  className = '',
  style,
  ...props
}, ref) => {
  return (
    <div className={`ui-input-wrapper ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '10px 14px',
          fontSize: '14px',
          borderRadius: 'var(--radius)',
          border: error ? '1.5px solid #EF4444' : '1.5px solid var(--border)',
          backgroundColor: 'var(--bg)',
          color: 'var(--text-primary)',
          outline: 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          ...style,
        }}
        {...props}
      />
      {error && (
        <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: 500 }}>
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
