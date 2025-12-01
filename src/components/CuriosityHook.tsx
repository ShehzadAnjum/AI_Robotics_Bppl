import React from 'react';

interface CuriosityHookProps {
  children: React.ReactNode;
  type?: 'opening' | 'closing';
}

/**
 * CuriosityHook component (Elements 1 & 12)
 * Creates attention-seeker hooks and next-chapter curiosity hooks
 */
export default function CuriosityHook({ children, type = 'opening' }: CuriosityHookProps): JSX.Element {
  return (
    <div
      className={`curiosity-hook curiosity-hook--${type}`}
      data-testid={type === 'opening' ? 'curiosity-hook' : 'next-chapter-hook'}
      style={{
        padding: '1.5rem',
        marginBottom: '2rem',
        borderLeft: '4px solid var(--ifm-color-primary)',
        backgroundColor: 'var(--ifm-background-color-secondary)',
        borderRadius: '4px',
      }}
    >
      <div style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  );
}
