import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { StepIndicator } from '../../components/common/StepIndicator';
import { CheckCircle2, Download, Printer, Home, Calendar, Ticket } from 'lucide-react';

export const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h3>No Booking Found</h3>
        <Link to="/passenger/dashboard" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <StepIndicator currentStep={5} />

      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Success Header */}
        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(to right, #ecfdf5, #ffffff)', border: '2px solid var(--success-500)', marginBottom: '2rem', padding: '2.5rem 1.5rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--success-500)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
            <CheckCircle2 size={40} />
          </div>
          <h1 style={{ color: '#047857', fontSize: '2rem', marginBottom: '0.25rem' }}>
            BOOKING CONFIRMED!
          </h1>
          <p style={{ color: 'var(--navy-600)', fontSize: '1rem' }}>
            Your ticket reservation has been successfully completed.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <span className="badge badge-primary" style={{ fontSize: '1rem', padding: '0.5rem 1.25rem' }}>
              Booking ID: {booking.id}
            </span>
          </div>
        </div>

        {/* Ticket Details Box */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--slate-200)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-900)' }}>{booking.operator}</h3>
              <p style={{ color: 'var(--navy-600)', fontSize: '0.875rem' }}>{booking.busType} • {booking.busNumber}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>Date of Journey</div>
              <div style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--navy-900)' }}>{booking.journeyDate}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--slate-50)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>From</div>
              <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--navy-900)' }}>{booking.origin}</div>
            </div>
            <div style={{ fontWeight: '700', color: 'var(--primary-600)', fontSize: '1.1rem' }}>
              →
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>To</div>
              <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--navy-900)' }}>{booking.destination}</div>
            </div>
          </div>

          {/* Segment Allocations */}
          <h4 style={{ marginBottom: '0.75rem', color: 'var(--navy-900)' }}>Segment Seat Allocations</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
            {booking.segmentAllocations?.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#ffffff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontWeight: '600', color: 'var(--navy-800)' }}>{item.segment}</span>
                <span className="badge badge-purple" style={{ fontSize: '0.9rem', padding: '0.35rem 0.75rem' }}>
                  Seat {item.seatNumber}
                </span>
              </div>
            ))}
          </div>

          {/* Passengers */}
          <h4 style={{ marginBottom: '0.75rem', color: 'var(--navy-900)' }}>Passenger Details</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {booking.passengers?.map((p, idx) => (
              <div key={idx} style={{ fontSize: '0.9rem', color: 'var(--navy-800)', padding: '0.5rem 0.75rem', background: 'var(--slate-50)', borderRadius: '4px' }}>
                <strong>{p.name}</strong> ({p.gender}, {p.age} yrs) • Phone: {p.phone} • Email: {p.email}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--slate-200)', paddingTop: '1rem' }}>
            <span style={{ fontWeight: '600', color: 'var(--navy-800)' }}>Total Fare Paid:</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-600)' }}>₹{booking.totalFare}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn btn-primary btn-lg">
            <Printer size={18} /> Print / Download Ticket
          </button>
          <Link to="/passenger/bookings" className="btn btn-outline btn-lg">
            <Ticket size={18} /> View Booking History
          </Link>
          <Link to="/passenger/dashboard" className="btn btn-secondary btn-lg">
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
