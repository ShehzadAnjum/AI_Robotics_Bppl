import React from 'react';

interface SelfEvalQuestionProps {
  question: string;
  topicReference: string;
  children?: React.ReactNode;
}

/**
 * SelfEvalQuestion component (Element 10)
 * Self-evaluation questions with topic references (NO answer keys)
 */
export default function SelfEvalQuestion({ question, topicReference, children }: SelfEvalQuestionProps): JSX.Element {
  return (
    <div
      className="self-eval-question"
      data-testid="self-eval"
      style={{
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '4px',
        borderLeft: '3px solid #6b7280',
      }}
    >
      <div style={{ fontWeight: 500, marginBottom: '0.5rem' }}>
        ❓ {question}
      </div>
      <div style={{ fontSize: '0.85rem', color: '#6b7280', fontStyle: 'italic' }}>
        💡 Review: {topicReference}
      </div>
      {children && (
        <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: '#374151' }}>
          {children}
        </div>
      )}
    </div>
  );
}
