import React from 'react';

interface AssignmentCardProps {
  title: string;
  children: React.ReactNode;
  estimatedTime?: string;
}

/**
 * AssignmentCard component (Element 11)
 * Displays short assignments with clear success criteria
 */
export default function AssignmentCard({ title, children, estimatedTime = '30-60 min' }: AssignmentCardProps): React.ReactElement {
  return (
    <div
      className="assignment-card"
      data-testid="assignment"
      style={{
        padding: '2rem',
        marginBottom: '2rem',
        backgroundColor: '#fef3c7',
        borderRadius: '8px',
        border: '2px solid #f59e0b',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, color: '#92400e' }}>
          📝 Assignment: {title}
        </h3>
        <span style={{ fontSize: '0.9rem', color: '#78350f', fontWeight: 500 }}>
          ⏱️ {estimatedTime}
        </span>
      </div>
      <div style={{ lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  );
}
