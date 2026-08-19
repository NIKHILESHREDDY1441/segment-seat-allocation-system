import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { Search, MapPin, Calendar, Users, ArrowRight, Zap, ShieldCheck, Ticket } from 'lucide-react';
import { getStoredBookings } from '../../services/storageService';

export const HomeDashboard = () => {
  const { updateSearch } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [origin, setOrigin] = useState('Hyderabad');
  const [destination, setDestination] = useState('Bangalore');
  const [date, setDate] = useState('2026-08-20');
  const [passengers, setPassengers] = useState(1);

  const bookings = getStoredBookings();
  const upcomingBooking = bookings[0];

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearch({ origin, destination, date, passengerCount: parseInt(passengers, 10) });
    navigate('/passenger/buses');
  };

  const handlePopularRouteSelect = (orig, dest) => {
    setOrigin(orig);
    setDestination(dest);
    updateSearch({ origin: orig, destination: dest, date, passengerCount: 1 });
    navigate('/passenger/buses');
  };

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      {/* Hero Search Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)',
        color: '#ffffff',
        padding: '3rem 0 4rem',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '2rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Zap size={14} /> Smart Segment Seat Allocation System
            </span>
            <h1 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '0.75rem', fontWeight: '800' }}>
              Where are you travelling?
            </h1>
            <p style={{ color: 'var(--slate-300)', fontSize: '1.05rem' }}>
              Book continuous or multi-seat segment allocation for guaranteed 100% journey coverage across intermediate bus stops.
            </p>
          </div>

          {/* Search Box */}
          <div className="card" style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-xl)',
            color: 'var(--navy-900)'
          }}>
            <form onSubmit={handleSearch} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              alignItems: 'end'
            }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">From (Origin)</label>
                <div style={{ position: 'relative' }}>
                  <select
                    className="input-field"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  >
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">To (Destination)</label>
                <div style={{ position: 'relative' }}>
                  <select
                    className="input-field"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Goa">Goa</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="Mangalore">Mangalore</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Journey Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Passengers</label>
                <select
                  className="input-field"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                >
                  <option value={1}>1 Passenger</option>
                  <option value={2}>2 Passengers</option>
                  <option value={3}>3 Passengers</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ height: '48px' }}>
                <Search size={20} /> Search Buses
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div>
            {/* Upcoming Journey */}
            {upcomingBooking && (
              <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(to right, #ffffff, #f8fafc)', borderLeft: '4px solid var(--primary-600)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge badge-primary">
                    <Calendar size={12} /> Upcoming Journey
                  </span>
                  <Link to="/passenger/bookings" style={{ color: 'var(--primary-600)', fontSize: '0.85rem', fontWeight: '700' }}>
                    View All Bookings
                  </Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-900)' }}>
                      {upcomingBooking.origin} → {upcomingBooking.destination}
                    </h3>
                    <p style={{ color: 'var(--navy-600)', fontSize: '0.875rem' }}>
                      {upcomingBooking.operator} • {upcomingBooking.journeyDate}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.85rem' }}>
                      Ticket #{upcomingBooking.id}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Popular Routes */}
            <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: 'var(--navy-900)' }}>
              Popular Segment-Allocated Routes
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              <div
                className="card card-hover"
                onClick={() => handlePopularRouteSelect('Hyderabad', 'Bangalore')}
                style={{ cursor: 'pointer' }}
              >
                <div className="badge badge-orange" style={{ marginBottom: '0.5rem' }}>
                  Hyd → Kur → Anant → Blr
                </div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>Hyderabad → Bangalore</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
                  Daily 6+ Buses • Segment Seat Ready
                </p>
                <div style={{ marginTop: '0.75rem', fontWeight: '700', color: 'var(--primary-600)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  Book Now <ArrowRight size={14} />
                </div>
              </div>

              <div
                className="card card-hover"
                onClick={() => handlePopularRouteSelect('Mumbai', 'Goa')}
                style={{ cursor: 'pointer' }}
              >
                <div className="badge badge-orange" style={{ marginBottom: '0.5rem' }}>
                  Mum → Pune → Kolhapur → Goa
                </div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>Mumbai → Goa</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
                  Daily 4+ Luxury Sleepers
                </p>
                <div style={{ marginTop: '0.75rem', fontWeight: '700', color: 'var(--primary-600)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  Book Now <ArrowRight size={14} />
                </div>
              </div>

              <div
                className="card card-hover"
                onClick={() => handlePopularRouteSelect('Chennai', 'Coimbatore')}
                style={{ cursor: 'pointer' }}
              >
                <div className="badge badge-orange" style={{ marginBottom: '0.5rem' }}>
                  Che → Vel → Salem → Coim
                </div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>Chennai → Coimbatore</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
                  Daily 5+ Express Buses
                </p>
                <div style={{ marginTop: '0.75rem', fontWeight: '700', color: 'var(--primary-600)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  Book Now <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* Side Info Box */}
          <div>
            <div className="card" style={{ background: 'var(--navy-900)', color: '#ffffff', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-500)', marginBottom: '0.75rem' }}>
                <Zap size={20} />
                <h4 style={{ color: '#ffffff' }}>How Segment Seat Allocation Works</h4>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-300)', lineHeight: '1.6', marginBottom: '1rem' }}>
                If no single seat is free for your full journey, our intelligent system automatically stitches available seats across intermediate route stops so you never miss your bus!
              </p>
              <ul style={{ fontSize: '0.85rem', color: 'var(--slate-300)', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                <li>✓ 100% Full Journey Coverage</li>
                <li>✓ Minimizes Seat Switches</li>
                <li>✓ Recommends Optimal Combos</li>
              </ul>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <Ticket size={32} color="var(--primary-600)" style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontSize: '1.05rem', color: 'var(--navy-900)', marginBottom: '0.25rem' }}>Manage Bookings</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--navy-600)', marginBottom: '1rem' }}>
                View, download or print existing segment ticket reservations.
              </p>
              <Link to="/passenger/bookings" className="btn btn-outline btn-full btn-sm">
                View My History
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
