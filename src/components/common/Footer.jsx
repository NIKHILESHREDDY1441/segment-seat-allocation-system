import React from 'react';
import { Bus, Shield, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="navbar-brand" style={{ marginBottom: '1rem' }}>
              <div className="navbar-brand-icon">
                <Bus size={20} />
              </div>
              <span>SegmentSeat<span style={{ color: 'var(--primary-500)' }}>Reserve</span></span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--slate-400)' }}>
              Next-generation Bus Reservation System with Intelligent Segment Seat Allocation technology.
              Maximizing seat utilization & route coverage across intermediate bus stops.
            </p>
          </div>

          <div>
            <h4 className="footer-title">For Passengers</h4>
            <ul className="footer-links">
              <li><a href="#/passenger/buses">Search Buses</a></li>
              <li><a href="#/passenger/segment-allocation">Segment Allocation</a></li>
              <li><a href="#/passenger/bookings">My Bookings</a></li>
              <li><a href="#/passenger/login">Passenger Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">For Operators</h4>
            <ul className="footer-links">
              <li><a href="#/admin/login">Operator Portal</a></li>
              <li><a href="#/admin/dashboard">Admin Dashboard</a></li>
              <li><a href="#/admin/buses">Route & Seat Config</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Key Innovation</h4>
            <div style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontWeight: '700', color: '#fff', marginBottom: '0.25rem' }}>Dynamic Seat Stitching</div>
              <p style={{ color: 'var(--slate-400)' }}>Intelligently combines intermediate seat availability to ensure 100% journey coverage.</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Segment Seat Allocation System. Built for Smart Travel & Maximum Efficiency.</p>
        </div>
      </div>
    </footer>
  );
};
