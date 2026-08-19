import React from 'react';
import { SeatMap } from '../passenger/SeatMap';

export const SeatLayoutEditor = ({
  bus,
  layoutType,
  totalSeats,
  segmentAvailability = {},
  onChangeLayout,
  onChangeTotalSeats,
  onToggleSeatSegmentAvailability
}) => {
  const mockBusConfig = {
    ...bus,
    layoutType,
    totalSeats: parseInt(totalSeats, 10) || 40,
    segmentSeatAvailability: segmentAvailability
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      {/* Controls */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '1.25rem' }}>
          Seat Layout Configuration
        </h3>

        <div className="form-group">
          <label className="form-label">Layout Type</label>
          <select
            className="input-field"
            value={layoutType}
            onChange={(e) => onChangeLayout(e.target.value)}
          >
            <option value="2+2">2 + 2 Standard Seater (40 Seats)</option>
            <option value="2+1">2 + 1 Luxury Seater (30 Seats)</option>
            <option value="Sleeper">Sleeper Berths (Lower & Upper - 30 Berths)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Total Seats Capacity</label>
          <input
            type="number"
            className="input-field"
            value={totalSeats}
            onChange={(e) => onChangeTotalSeats(e.target.value)}
          />
        </div>

        <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', marginTop: '1rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
            Live Sync Notice
          </h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--navy-600)', lineHeight: '1.5' }}>
            Modifying this seat layout saves changes directly to local storage. Any passenger viewing this bus will immediately see the updated seat layout.
          </p>
        </div>
      </div>

      {/* Live Layout Preview */}
      <div>
        <h4 style={{ marginBottom: '0.75rem', color: 'var(--navy-900)' }}>Live Layout Preview</h4>
        <SeatMap bus={mockBusConfig} />
      </div>
    </div>
  );
};
