import React from 'react';
import { CheckCircle2, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export const AllocationCard = ({
  allocation,
  isRecommended = false,
  onSelect,
  title = "Option"
}) => {
  if (!allocation) return null;

  return (
    <div className={`allocation-card ${isRecommended ? 'recommended-card' : ''}`}>
      {isRecommended && (
        <div className="recommended-ribbon">
          <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} /> Recommended Best Option
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)' }}>{title}</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className="badge badge-success">
            Coverage: {allocation.journeyCoverage || 100}%
          </span>
          <span className={`badge ${allocation.seatChanges === 0 ? 'badge-primary' : 'badge-orange'}`}>
            Seat Changes: {allocation.seatChanges}
          </span>
        </div>
      </div>

      {/* Segment Seat Mapping Breakdown */}
      <div style={{
        background: 'var(--slate-50)',
        border: '1px solid var(--slate-200)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '1.25rem'
      }}>
        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Segment-by-Segment Allocation:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {allocation.allocations.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--slate-200)' }}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--navy-800)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {item.segment}
              </span>
              <span className="badge badge-purple" style={{ fontSize: '0.85rem' }}>
                Seat {item.seatNumber}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Explanations List */}
      {allocation.explanations && allocation.explanations.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--navy-800)', marginBottom: '0.5rem' }}>
            Why choose this option?
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {allocation.explanations.map((exp, idx) => (
              <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--navy-700)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--success-600)" /> {exp}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => onSelect && onSelect(allocation)}
        className={`btn ${isRecommended ? 'btn-primary' : 'btn-outline'} btn-full`}
      >
        Select This Allocation
      </button>
    </div>
  );
};
