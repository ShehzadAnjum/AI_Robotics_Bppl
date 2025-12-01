import React from 'react';

interface AIPromptCardProps {
  children: React.ReactNode;
}

/**
 * AIPromptCard component (Element 8)
 * Displays AI learning prompts for deeper understanding
 */
export default function AIPromptCard({ children }: AIPromptCardProps): React.ReactElement {
  return (
    <div
      className="ai-prompt-card"
      data-testid="ai-prompt"
      style={{
        padding: '1.5rem',
        marginBottom: '1.5rem',
        backgroundColor: '#f0f9ff',
        borderLeft: '4px solid #3b82f6',
        borderRadius: '4px',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#1e40af' }}>
        🤖 AI Learning Prompt
      </div>
      <div style={{ fontStyle: 'italic', lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  );
}
