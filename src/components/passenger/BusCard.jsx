import React from 'react';
import { Clock, ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react';

export const BusCard = ({ bus, onSelect }) => {
  return (
    <div className="card card-hover" style={{ marginBottom: '1.25rem', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)' }}>{bus.operator}</h3>
            <span className="badge badge-primary">
              <Star size={12} fill="currentColor" /> {bus.rating}
            </span>
          </div>
          <p style={{ color: 'var(--navy-600)', fontSize: '0.875rem', fontWeight: '500' }}>
            {bus.busType} • {bus.busNumber}
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-600)' }}>
            ₹{bus.basePrice}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--success-600)', fontWeight: '600' }}>
            {bus.totalSeats ? `${bus.totalSeats} Total Seats` : 'Seats Available'}
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--slate-200)', margin: '1rem 0' }} />

      {/* Schedule & Route Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-900)' }}>
            {bus.departureTime}
          </div>
          <div style={{ fontWeight: '600', color: 'var(--navy-800)', fontSize: '0.95rem' }}>
            {bus.origin}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center', marginBottom: '0.25rem' }}>
            <Clock size={12} /> {bus.duration}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-600)' }}>
            <div style={{ height: '2px', width: '40px', background: 'var(--primary-500)' }}></div>
            <ArrowRight size={16} />
            <div style={{ height: '2px', width: '40px', background: 'var(--primary-500)' }}></div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--navy-600)', fontWeight: '500', marginTop: '0.25rem' }}>
            Direct & Segmented
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-900)' }}>
            {bus.arrivalTime}
          </div>
          <div style={{ fontWeight: '600', color: 'var(--navy-800)', fontSize: '0.95rem' }}>
            {bus.destination}
          </div>
        </div>
      </div>

      {/* Route Stops Ribbon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--slate-50)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy-700)' }}>Stops:</span>
          {bus.stops.map((stop, idx) => (
            <span key={idx} className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
              {stop} {idx < bus.stops.length - 1 ? '→' : ''}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Zap size={12} /> Smart Segment Allocation
          </span>
          <button onClick={() => onSelect(bus)} className="btn btn-primary btn-sm">
            Select Bus
          </button>
        </div>
      </div>
    </div>
  );
};
