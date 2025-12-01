import React from 'react';

interface DrivingQuestionProps {
  children: React.ReactNode;
}

/**
 * DrivingQuestion component (Element 2)
 * Displays the central question the chapter answers
 */
export default function DrivingQuestion({ children }: DrivingQuestionProps): JSX.Element {
  return (
    <div
      className="driving-question"
      data-testid="driving-question"
      style={{
        padding: '2rem',
        marginBottom: '2rem',
        backgroundColor: 'var(--ifm-color-primary-lightest)',
        borderRadius: '8px',
        border: '2px solid var(--ifm-color-primary-light)',
      }}
    >
      <h2 style={{ marginTop: 0, color: 'var(--ifm-color-primary-dark)' }}>
        🤔 Driving Question
      </h2>
      <div style={{ fontSize: '1.2rem', fontWeight: 500, lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  );
}
