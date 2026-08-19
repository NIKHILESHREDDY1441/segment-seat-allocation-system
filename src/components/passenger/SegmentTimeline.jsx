import React from 'react';
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SegmentTimeline = ({
  stops = [],
  activeSegmentIndex = 0,
  onSegmentClick,
  segmentSelections = {}
}) => {
  if (!stops || stops.length < 2) return null;

  return (
    <div className="segment-timeline-wrapper">
      <h4 style={{ marginBottom: '1rem', color: 'var(--navy-900)' }}>Your Route Breakdown & Segments</h4>
      
      <div className="segment-track">
        <div className="segment-line"></div>
        {stops.map((stop, idx) => (
          <div key={idx} className="segment-stop-node">
            <div className="stop-circle"></div>
            <div className="stop-city">{stop}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
              {idx === 0 ? 'Origin' : idx === stops.length - 1 ? 'Destination' : `Stop ${idx}`}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stops.length - 1}, 1fr)`,
        gap: '1rem',
        marginTop: '1.5rem'
      }}>
        {stops.slice(0, stops.length - 1).map((fromCity, idx) => {
          const toCity = stops[idx + 1];
          const segKey = `${fromCity}-${toCity}`;
          const isSelected = activeSegmentIndex === idx;
          const assignedSeat = segmentSelections[segKey];

          return (
            <div
              key={segKey}
              onClick={() => onSegmentClick && onSegmentClick(idx, segKey)}
              className={`segment-block-card ${isSelected ? 'active' : ''}`}
              style={{ cursor: onSegmentClick ? 'pointer' : 'default' }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--primary-600)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Segment {idx + 1}
              </div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                {fromCity} <ArrowRight size={14} /> {toCity}
              </div>

              {assignedSeat ? (
                <span className="badge badge-orange" style={{ width: '100%', justifyContent: 'center', padding: '0.35rem' }}>
                  <CheckCircle2 size={13} /> Assigned Seat {assignedSeat}
                </span>
              ) : (
                <span className="badge badge-slate" style={{ width: '100%', justifyContent: 'center', padding: '0.35rem' }}>
                  Select Seat
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
