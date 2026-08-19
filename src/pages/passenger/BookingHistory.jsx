import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingService } from '../../services/bookingService';
import { BookingCard } from '../../components/passenger/BookingCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Ticket, Filter, Calendar } from 'lucide-react';

export const BookingHistory = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');

  const allBookings = bookingService.getUserBookings(user?.email);

  const filteredBookings = allBookings.filter(b => {
    if (filter === 'All') return true;
    if (filter === 'Upcoming') return b.status === 'Confirmed';
    if (filter === 'Completed') return b.status === 'Completed';
    if (filter === 'Cancelled') return b.status === 'Cancelled';
    return true;
  });

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Header */}
        <div className="card" style={{ marginBottom: '1.75rem', background: 'linear-gradient(to right, var(--navy-900), var(--navy-800))', color: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Ticket size={24} color="var(--primary-500)" />
                <h1 style={{ fontSize: '1.5rem', color: '#ffffff' }}>My Booking History</h1>
              </div>
              <p style={{ color: 'var(--slate-300)', fontSize: '0.9rem' }}>
                Manage & view your segment seat allocation reservations.
              </p>
            </div>
            <div>
              <span className="badge badge-purple" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
                {allBookings.length} Total Bookings
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['All', 'Upcoming', 'Completed', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Booking Cards List */}
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <BookingCard key={b.id} booking={b} />
          ))
        ) : (
          <EmptyState
            icon={Calendar}
            title="No Bookings Found"
            message={`No bookings matching the status "${filter}". Try searching and booking your next journey!`}
          />
        )}
      </div>
    </div>
  );
};
