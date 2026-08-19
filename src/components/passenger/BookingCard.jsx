import React, { useState } from 'react';
import { Calendar, Ticket, User, ArrowRight, Download, Printer } from 'lucide-react';
import { Modal } from '../common/Modal';

export const BookingCard = ({ booking }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card card-hover" style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-900)' }}>{booking.operator}</h3>
            <span className="badge badge-success">
              {booking.status || 'Confirmed'}
            </span>
          </div>
          <p style={{ color: 'var(--navy-600)', fontSize: '0.85rem' }}>
            Booking ID: <strong style={{ color: 'var(--primary-600)' }}>{booking.id}</strong> • {booking.busType}
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-900)' }}>
            ₹{booking.totalFare || 850}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
            Paid via {booking.paymentMethod || 'UPI'}
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--slate-200)', margin: '0.85rem 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Route</div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--navy-900)' }}>
              {booking.origin} → {booking.destination}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Journey Date</div>
            <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--navy-800)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} /> {booking.journeyDate}
            </div>
          </div>
        </div>

        <button onClick={() => setShowDetails(true)} className="btn btn-outline btn-sm">
          <Ticket size={14} /> View Details
        </button>
      </div>

      {/* Booking Details Modal */}
      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title={`Ticket Details - ${booking.id}`}
        footer={(
          <button onClick={() => window.print()} className="btn btn-primary btn-sm">
            <Printer size={16} /> Print / Download Ticket
          </button>
        )}
      >
        <div style={{ padding: '0.5rem 0' }}>
          <div style={{ background: 'var(--primary-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-100)', marginBottom: '1.25rem' }}>
            <h4 style={{ color: 'var(--primary-700)', marginBottom: '0.25rem' }}>{booking.operator}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--navy-700)' }}>{booking.busNumber} • {booking.busType}</p>
            <div style={{ marginTop: '0.5rem', fontWeight: '700', fontSize: '1.05rem', color: 'var(--navy-900)' }}>
              {booking.origin} → {booking.destination} ({booking.journeyDate})
            </div>
          </div>

          <h5 style={{ marginBottom: '0.75rem', color: 'var(--navy-900)' }}>Segment Seat Allocations</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {booking.segmentAllocations?.map((seg, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', background: 'var(--slate-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--slate-200)' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{seg.segment}</span>
                <span className="badge badge-purple">Seat {seg.seatNumber}</span>
              </div>
            ))}
          </div>

          <h5 style={{ marginBottom: '0.75rem', color: 'var(--navy-900)' }}>Passengers</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {booking.passengers?.map((p, idx) => (
              <div key={idx} style={{ fontSize: '0.875rem', color: 'var(--navy-700)' }}>
                <strong>{p.name}</strong> ({p.gender}, {p.age} yrs) • Phone: {p.phone}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
