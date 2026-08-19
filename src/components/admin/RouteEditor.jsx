import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, MapPin } from 'lucide-react';

export const RouteEditor = ({ stops = [], onChange }) => {
  const handleAddStop = () => {
    onChange([...stops, `Stop ${stops.length + 1}`]);
  };

  const handleUpdateStop = (idx, value) => {
    const updated = [...stops];
    updated[idx] = value;
    onChange(updated);
  };

  const handleRemoveStop = (idx) => {
    if (stops.length <= 2) {
      alert('A route must have at least 2 stops (Origin and Destination).');
      return;
    }
    const updated = stops.filter((_, i) => i !== idx);
    onChange(updated);
  };

  const handleMove = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= stops.length) return;
    const updated = [...stops];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange(updated);
  };

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '1.05rem', color: 'var(--navy-900)' }}>Configure Route & Intermediate Stops</h4>
        <button type="button" onClick={handleAddStop} className="btn btn-sm btn-outline">
          <Plus size={14} /> Add Stop
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {stops.map((stop, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--slate-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem' }}>
              {idx + 1}
            </span>
            <input
              type="text"
              className="input-field"
              value={stop}
              placeholder={idx === 0 ? "Origin City" : idx === stops.length - 1 ? "Destination City" : `Intermediate Stop ${idx}`}
              onChange={(e) => handleUpdateStop(idx, e.target.value)}
            />
            <button
              type="button"
              onClick={() => handleMove(idx, -1)}
              disabled={idx === 0}
              className="btn btn-sm btn-secondary"
              style={{ padding: '0.4rem 0.5rem' }}
            >
              <ArrowUp size={14} />
            </button>
            <button
              type="button"
              onClick={() => handleMove(idx, 1)}
              disabled={idx === stops.length - 1}
              className="btn btn-sm btn-secondary"
              style={{ padding: '0.4rem 0.5rem' }}
            >
              <ArrowDown size={14} />
            </button>
            <button
              type="button"
              onClick={() => handleRemoveStop(idx)}
              className="btn btn-sm btn-danger"
              style={{ padding: '0.4rem 0.5rem' }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Generated Sub-Segments Preview */}
      {stops.length >= 2 && (
        <div style={{ marginTop: '1.25rem', background: 'var(--slate-50)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Auto-Generated Route Segments:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {stops.slice(0, stops.length - 1).map((s, i) => (
              <span key={i} className="badge badge-purple">
                Segment {i+1}: {s} → {stops[i+1]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
