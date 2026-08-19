import React from 'react';
import { AlertCircle } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = AlertCircle,
  title = "No Data Found",
  message = "There are no records matching your request.",
  actionText,
  onAction
}) => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '3rem 1.5rem',
      background: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--slate-200)',
      margin: '1.5rem 0'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--slate-100)',
        color: 'var(--slate-500)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <Icon size={28} />
      </div>
      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--navy-900)' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--navy-600)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
        {message}
      </p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-sm">
          {actionText}
        </button>
      )}
    </div>
  );
};
