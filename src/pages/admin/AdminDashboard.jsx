import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { busService } from '../../services/busService';
import { bookingService } from '../../services/bookingService';
import { Bus, Settings, Plus, TrendingUp, Users, Ticket, DollarSign } from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const buses = busService.getAllBuses();
  const bookings = bookingService.getAllBookings();

  const totalBuses = buses.length;
  const totalSeats = buses.reduce((sum, b) => sum + (b.totalSeats || 40), 0);
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalFare || 850), 0);

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Header */}
        <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(to right, var(--navy-900), var(--navy-800))', color: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.6rem', color: '#ffffff' }}>Operator Admin Control Center</h1>
              <p style={{ color: 'var(--slate-300)', fontSize: '0.9rem' }}>
                Fleet oversight, route configuration & dynamic seat layout management.
              </p>
            </div>
            <button onClick={() => navigate('/admin/buses/add')} className="btn btn-primary btn-lg">
              <Plus size={18} /> Add New Bus
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div className="card" style={{ borderLeft: '4px solid var(--primary-600)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: '700', textTransform: 'uppercase' }}>
              Total Buses
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--navy-900)', marginTop: '0.25rem' }}>
              {totalBuses}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success-600)', marginTop: '0.25rem' }}>
              Active in Fleet
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--success-500)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: '700', textTransform: 'uppercase' }}>
              Total Seats Capacity
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--navy-900)', marginTop: '0.25rem' }}>
              {totalSeats}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
              Across all routes
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--seat-recommended-border)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: '700', textTransform: 'uppercase' }}>
              Total Reservations
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--navy-900)', marginTop: '0.25rem' }}>
              {bookings.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success-600)', marginTop: '0.25rem' }}>
              Segment Allocations Included
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--warning-500)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: '700', textTransform: 'uppercase' }}>
              Total Revenue
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-600)', marginTop: '0.25rem' }}>
              ₹{totalRevenue}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
              Simulated Earnings
            </div>
          </div>
        </div>

        {/* Fleet Overview & Quick Seat Config List */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)' }}>Active Bus Fleet & Seat Layouts</h3>
            <Link to="/admin/buses" style={{ color: 'var(--primary-600)', fontWeight: '700', fontSize: '0.9rem' }}>
              Manage Full Fleet →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {buses.map((bus) => (
              <div key={bus.id} style={{ border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', padding: '1rem', background: 'var(--slate-50)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--navy-900)' }}>{bus.busNumber}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--navy-600)' }}>{bus.operator}</p>
                  </div>
                  <span className="badge badge-purple">{bus.layoutType}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '0.85rem' }}>
                  Route: <strong>{bus.origin} → {bus.destination}</strong> ({bus.totalSeats} Seats)
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => navigate(`/admin/buses/${bus.id}/seats`)} className="btn btn-sm btn-outline" style={{ flex: 1 }}>
                    <Settings size={14} /> Config Seats
                  </button>
                  <button onClick={() => navigate(`/admin/buses/${bus.id}/edit`)} className="btn btn-sm btn-secondary" style={{ flex: 1 }}>
                    Edit Bus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
